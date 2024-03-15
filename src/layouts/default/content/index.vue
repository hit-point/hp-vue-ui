<script lang="tsx">
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import PageLayout from '/@/layouts/page/index.vue';

  export default defineComponent({
    name: 'LayoutContent',
    components: { PageLayout },
    setup() {
      const { prefixCls } = useDesign('layout-content');

      return () => (
        <el-scrollbar class={prefixCls} height={'100%'}>
          <PageLayout />
        </el-scrollbar>
      );
    },
  });
</script>

<style lang="scss">
  $prefix-cls: '#{$namespace}-layout-content';

  .#{$prefix-cls} {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
  }
</style>
