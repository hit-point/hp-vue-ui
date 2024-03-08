<script lang="tsx">
  import {
    defineComponent,
    unref,
    ref,
    computed,
    toRaw,
    getCurrentInstance,
    watch,
    nextTick,
    defineAsyncComponent,
  } from 'vue';
  import { isFunction, omit } from 'lodash-es';
  import { drawerProp } from './prop';
  import { DrawerAction, DrawerProp } from './typing';
  import { deepMerge } from '/@/utils';
  import { getSlot } from '/@/utils/helper/tsxHelper';
  export default defineComponent({
    name: 'BasicDrawer',
    props: drawerProp,
    inheritAttrs: false,
    emits: ['register', 'visible-change', 'cancel', 'ok'],
    setup(props, { attrs, emit, slots }) {
      // 插槽内要使用异步引入，不然会有Vue warn
      const DrawerHeader = defineAsyncComponent(() => import('./components/DrawerHeader.vue'));
      const DrawerFooter = defineAsyncComponent(() => import('./components/DrawerFooter.vue'));
      const instance = getCurrentInstance();
      const propsRef = ref<Partial<DrawerProp>>();
      const visibleRef = ref<boolean>(false);
      const getMergeProps = computed(() => deepMerge(toRaw(props), unref(propsRef)));
      const getProps = computed(() => {
        const opt = {
          ...unref(getMergeProps),
          visible: unref(visibleRef),
        };
        return opt as DrawerProp;
      });
      const getBindValues = computed(() => {
        return {
          ...attrs,
          ...unref(getProps),
        };
      });
      const getFooterSlots = computed(() => {
        const slotsObj: Record<string, any> = {};
        return Object.keys(omit(slots, ['default', 'header', 'footer'])).reduce((_prev, next) => {
          if (next) {
            slotsObj[next] = () => getSlot(slots, next);
          }
          return slotsObj;
        }, {} as Record<string, any>);
      });

      const getDrawerSlot = computed(() => {
        const getContent = (slotField: string, htmlElement: JSX.Element) => {
          return slots[slotField] ? <>{getSlot(slots, slotField)}</> : htmlElement;
        };
        return {
          header: () => getContent('header', <DrawerHeader {...unref(getBindValues)} />),
          default: () => (
            <el-scrollbar maxHeight={unref(getProps).maxBodyHeight}>{getSlot(slots)}</el-scrollbar>
          ),
          footer: () =>
            getContent(
              'footer',
              <DrawerFooter
                {...unref(getBindValues)}
                onOk={handleOk}
                onCancel={handleCancel}
                v-slots={unref(getFooterSlots)}
              />,
            ),
        };
      });

      function handleOk(e: Event) {
        emit('ok', e);
      }

      function setProps(props: Partial<DrawerProp>) {
        propsRef.value = deepMerge(unref(propsRef) || {}, props);
        if (Reflect.has(props, 'visible')) {
          visibleRef.value = !!props.visible;
        }
      }

      const drawerInstance: DrawerAction = {
        setProps,
        emitVisible: undefined,
      };

      const handleCancel = async (e) => {
        const { closeFunc } = unref(getProps);
        emit('cancel', e);
        if (closeFunc && isFunction(closeFunc)) {
          const res = await closeFunc();
          visibleRef.value = !res;
          return;
        }
        visibleRef.value = false;
      };

      instance && emit('register', drawerInstance, instance.uid);

      watch(
        () => props.visible,
        (newVal, oldVal) => {
          if (newVal !== oldVal) visibleRef.value = newVal;
        },
      );

      watch(
        () => visibleRef.value,
        (v) => {
          nextTick(() => {
            emit('visible-change', v);
            instance && drawerInstance.emitVisible?.(v, instance.uid);
          });
        },
      );

      return () => (
        <el-drawer
          {...getBindValues}
          // v-model对应的值只能使用.value，使用unref会有类型爆红
          v-model={visibleRef.value}
          onClose={handleCancel}
          v-slots={unref(getDrawerSlot)}
        />
      );
    },
  });
</script>
