<script lang="tsx">
  import { defineComponent, computed, unref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import AsideMenu from '/@/layouts/default/menu/AsideMenu.vue';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';

  export default defineComponent({
    name: 'LayoutSider',
    setup() {
      const { prefixCls } = useDesign('layout-sider');
      const getSiderClass = computed(() => {
        return [prefixCls];
      });

      const { getMenuWidth, getCollapsed, getMenuBgColor } = useMenuSetting();

      const getWidth = computed(() => {
        return !unref(getCollapsed) ? `${unref(getMenuWidth)}px` : '64px';
      });

      const getSiderSty = computed(() => {
        return {
          background: unref(getMenuBgColor),
          maxWidth: unref(getWidth),
          minWidth: unref(getWidth),
        };
      });

      return () => (
        <el-aside class={unref(getSiderClass)} width={unref(getWidth)} style={unref(getSiderSty)}>
          <AsideMenu />
        </el-aside>
      );
    },
  });
</script>

<style lang="scss">
  $prefix-cls: '#{$namespace}-layout-sider';

  .#{$prefix-cls} {
    transition: all 0.3s;
  }
</style>
