<script lang="tsx">
  import { computed, defineComponent, unref } from 'vue';
  import { useSplitMenu } from './useLayoutMenu';
  import { BasicMenu } from '/@/components/psc-menu';
  import { useGo } from '/@/hooks/web/usePage';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';

  export default defineComponent({
    name: 'LayoutAsideMenu',
    setup() {
      const go = useGo();
      const { getUniqueOpened, getMenuMode, getCollapsed, getMenuBgColor } = useMenuSetting();
      const { menusRef } = useSplitMenu();
      const getCommonProps = computed(() => {
        const menus = unref(menusRef);
        return {
          menus: menus,
          uniqueOpened: unref(getUniqueOpened),
          mode: unref(getMenuMode),
          collapse: unref(getCollapsed),
          backgroundColor: unref(getMenuBgColor),
          textColor: '#fff',
          onSelect: handleMenuClick,
        };
      });

      function handleMenuClick(path: string) {
        go(path);
      }

      function renderItem() {
        const { menus, ...menuProps } = unref(getCommonProps);
        return <BasicMenu {...menuProps} menuItems={menus} />;
      }

      return () => renderItem();
    },
  });
</script>
