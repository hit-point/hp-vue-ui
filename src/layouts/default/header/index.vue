<script lang="tsx">
  import { defineComponent } from 'vue';
  import { computed } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import LayoutBreadCrumb from './LayoutBreadCrumb.vue';
  import MultipleTabs from './MultipleTabs.vue';
  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      LayoutBreadCrumb,
      MultipleTabs,
    },
    setup() {
      const { prefixCls } = useDesign('layout-header');

      const getHeaderClass = computed(() => {
        return [prefixCls];
      });

      return () => (
        <div class={getHeaderClass}>
          <LayoutBreadCrumb />
          <MultipleTabs />
        </div>
      );
    },
  });
</script>

<style lang="scss">
  $prefix-cls: '#{$namespace}-layout-header';

  .#{$prefix-cls} {
    &__header {
      position: fixed;
      top: 0;
      z-index: 505;
      width: 100%;
    }
  }
</style>
