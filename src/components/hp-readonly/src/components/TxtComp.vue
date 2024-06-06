<script lang="tsx">
  import { computed, defineComponent, ref, unref } from 'vue';
  import { getSlot } from '/@/utils/helper/tsxHelper';
  import { txtProps } from '../props';
  export default defineComponent({
    name: 'BasicTxtComp',
    inheritAttrs: false,
    props: txtProps,
    setup(props, { slots, attrs }) {
      const flag = ref(false);
      const buttonRef = ref();
      const tipSlots = computed(() => {
        return {
          content: () => <span>{getSlot(slots)}</span>,
        };
      });
      const txtComp = computed(() => {
        const flagChange = ({ flagVal, currentTarget }) => {
          flag.value = flagVal;
          buttonRef.value = currentTarget;
        };
        const txtMouseover = ({ target, currentTarget }) => {
          flagChange({
            flagVal: target.offsetWidth < target.scrollWidth,
            currentTarget: currentTarget,
          });
        };
        const txtMouseout = ({ currentTarget }) => {
          flagChange({
            flagVal: false,
            currentTarget: currentTarget,
          });
        };

        const compAttr: Recordable = {
          ...attrs,
          ...props,
          onMouseover: txtMouseover,
          onMouseout: txtMouseout,
        };
        return <el-Text {...compAttr}>{getSlot(slots)}</el-Text>;
      });
      return () => (
        <>
          {unref(txtComp)}
          <el-tooltip
            visible={unref(flag)}
            v-slots={unref(tipSlots)}
            virtual-ref={unref(buttonRef)}
            virtual-triggering
          />
        </>
      );
    },
  });
</script>
