<script lang="tsx">
  import { defineComponent } from 'vue';
  import { computed } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import LayoutBreadCrumb from './LayoutBreadCrumb.vue';
  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      LayoutBreadCrumb,
    },
    setup() {
      const { prefixCls } = useDesign('layout-header');

      const getHeaderClass = computed(() => {
        return [prefixCls];
      });

      return () => (
        <el-header class={getHeaderClass}>
          <el-card>
            <LayoutBreadCrumb />
          </el-card>
        </el-header>
      );
    },
  });
</script>

<style lang="scss">
  $prefix-cls: '#{$namespace}-layout-header';

  .#{$prefix-cls} {
    padding: 0;
  }
</style>
