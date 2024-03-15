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
          transition: 'all 0.2s ease 0s',
        };
      });

      return () => (
        <>
          <div style={unref(getSiderSty)} />
          <el-aside class={unref(getSiderClass)} width={unref(getWidth)} style={unref(getSiderSty)}>
            <AsideMenu />
          </el-aside>
        </>
      );
    },
  });
</script>

<style lang="scss">
  $prefix-cls: '#{$namespace}-layout-sider';

  .#{$prefix-cls} {
    position: fixed !important;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 510;
  }
</style>
