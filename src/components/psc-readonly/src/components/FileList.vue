<script lang="tsx">
  import { defineAsyncComponent, defineComponent, h } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { IconifyIcon } from '@iconify/vue';
  import { useRenderIcon } from '/@/components/psc-icon/src/hooks';
  import Paperclip from '@iconify-icons/ep/paperclip';
  import Delete from '@iconify-icons/ep/delete';
  import { fileListProps } from '../props';
  export default defineComponent({
    name: 'BasicFileList',
    props: fileListProps,
    setup(props) {
      const { prefixCls } = useDesign('basic-filelist');
      const TxtComp = defineAsyncComponent(() => import('./TxtComp.vue'));
      const renderIcon = (icon: IconifyIcon, customClass?: string) => {
        return h(useRenderIcon(icon), {
          class: `${prefixCls}__file-icon ${customClass}`,
        });
      };
      return () => (
        <>
          {props.keyToValList.map((x) => (
            <div class={`${prefixCls}__file`}>
              {renderIcon(Paperclip, '')}
              <TxtComp class={`${prefixCls}__file-name`}>{x.fileName || x.name}</TxtComp>
              {props.isDelete ? renderIcon(Delete, `${prefixCls}__file-delete`) : null}
            </div>
          ))}
        </>
      );
    },
  });
</script>

<style lang="scss">
  $prefix-cls: '#{$namespace}-basic-filelist';

  .#{$prefix-cls}__file {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 8px 0;

    &-name {
      flex: 1;
      padding-left: 8px;
      cursor: pointer;
      text-decoration: none;
    }

    &-name:hover {
      color: var(--el-color-primary);
    }

    &-icon {
      vertical-align: middle;
      cursor: pointer;
    }

    &-delete {
      color: var(--el-color-danger);
    }
  }
</style>
