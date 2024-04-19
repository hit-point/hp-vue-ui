<script lang="tsx">
  import { defineAsyncComponent, defineComponent, h } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRenderIcon } from '/@/components/psc-icon';
  import { fileListProps } from '../props';
  export default defineComponent({
    name: 'BasicFileList',
    props: fileListProps,
    setup(props) {
      const { prefixCls } = useDesign('basic-filelist');
      const TxtComp = defineAsyncComponent(() => import('./TxtComp.vue'));
      const renderIcon = (icon: string, customClass?: string) => {
        return h(useRenderIcon(icon), {
          class: `${prefixCls}__file-icon ${customClass}`,
        });
      };
      return () => (
        <>
          {props.keyToValList.map((x) => (
            <div class={`${prefixCls}__file`}>
              {renderIcon('paperclip', '')}
              <TxtComp class={`${prefixCls}__file-name`}>{x.fileName || x.name}</TxtComp>
              {props.isDelete ? renderIcon('delete', `${prefixCls}__file-delete`) : null}
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
