<script lang="tsx">
  import { computed, defineComponent, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '../../../components/hp-drawer';
  export default defineComponent({
    name: 'DemoDrawer',
    components: {
      BasicDrawer,
    },
    // useDrawerInner函数内部执行emit，因此在此添加emits
    emits: ['register'],
    setup() {
      const [register, { setProps }] = useDrawerInner(() => {
        setProps({
          title: '示例标题',
          helpMessage: ['示例提示信息1', '示例提示信息2', '示例提示信息3'],
        });
      });
      const demoDrawerSlots = computed(() => {
        return {
          default: () => <span>示例内容</span>,
          // insertFooter: () => <span>自定义底部插槽1</span>,
          // centerFooter: () => <span>自定义底部插槽2</span>,
          // appendFooter: () => <span>自定义底部插槽3</span>,
        };
      });
      return () => <BasicDrawer onRegister={register} v-slots={unref(demoDrawerSlots)} />;
    },
  });
</script>
