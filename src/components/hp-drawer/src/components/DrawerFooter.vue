<script lang="tsx">
  import { defineComponent, unref, computed } from 'vue';
  import { drawerProp } from '../prop';
  import { BasicButton } from '../../../hp-button';
  import { getSlot } from '/@/utils/helper/tsxHelper';
  export default defineComponent({
    name: 'DrawerFooter',
    props: drawerProp,
    inheritAttrs: false,
    emits: ['ok', 'cancel'],
    setup(props, { slots, emit }) {
      const cancelProp = computed(() => {
        return {
          ...props.cancelButtonProps,
          type: props.cancelType,
          onClick: handleCancel,
        };
      });
      const okProp = computed(() => {
        return {
          ...props.okButtonProps,
          type: props.okType,
          loading: props.confirmLoading,
          onClick: handleOk,
        };
      });

      function handleOk(e: Event) {
        emit('ok', e);
      }

      function handleCancel(e: Event) {
        emit('cancel', e);
      }

      function renderBtn(isShow, btnProp, text) {
        return isShow ? <BasicButton {...btnProp}>{text}</BasicButton> : null;
      }

      function renderFooterItem() {
        return (
          <div>
            {getSlot(slots, 'insertFooter')}
            {renderBtn(props.isShowOkBtn, unref(okProp), props.okText)}
            {getSlot(slots, 'centerFooter')}
            {renderBtn(props.isShowCancelBtn, unref(cancelProp), props.cancelText)}
            {getSlot(slots, 'appendFooter')}
          </div>
        );
      }

      return () => renderFooterItem();
    },
  });
</script>
