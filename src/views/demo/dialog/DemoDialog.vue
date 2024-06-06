<script lang="tsx">
  import { computed, defineComponent, unref } from 'vue';
  import { BasicDialog, useDialogInner } from '../../../components/hp-dialog';
  export default defineComponent({
    name: 'DemoDialog',
    components: {
      BasicDialog,
    },
    // useDialogInner函数内部执行emit，因此在此添加emits
    emits: ['register'],
    setup() {
      const [register, { setProps }] = useDialogInner(() => {
        setProps({
          title: '示例标题',
          helpMessage: ['示例提示信息1', '示例提示信息2', '示例提示信息3'],
        });
      });
      const demoDialogSlots = computed(() => {
        return {
          default: () => <span>示例内容</span>,
          // insertFooter: () => <span>自定义底部插槽1</span>,
          // centerFooter: () => <span>自定义底部插槽2</span>,
          // appendFooter: () => <span>自定义底部插槽3</span>,
        };
      });
      return () => <BasicDialog onRegister={register} v-slots={unref(demoDialogSlots)} />;
    },
  });
</script>
