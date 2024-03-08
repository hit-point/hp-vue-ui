<script lang="tsx">
  import { defineComponent, reactive, ref, toRefs, unref } from 'vue';
  import { basicProps } from './props';
  import BasicSubMenuItem from './components/BasicSubMenuItem.vue';
  import { Menu } from '/@/router/types';
  import { MenuState } from './types';
  import { listenerRouteChange } from '/@/logics/mitt/routeChange';
  import { REDIRECT_NAME } from '/@/router/constant';
  import { useDefaultOpeneds } from './useDefaultOpeneds';

  export default defineComponent({
    name: 'BasicMenu',
    props: basicProps,
    setup(props) {
      const currentActiveMenu = ref('');
      const currentActive = ref('');
      const { menuItems, ...menuProps } = toRefs(props);

      const menuState = reactive<MenuState>({
        defaultOpeneds: [],
        defaultActive: '',
      });

      const { setOpeneds } = useDefaultOpeneds(menuState, menuItems);

      listenerRouteChange((route) => {
        if (route.name === REDIRECT_NAME) return;
        currentActiveMenu.value = route.meta?.currentActiveMenu as string;
        currentActive.value = route.meta?.currentActive as string;

        if (unref(currentActiveMenu) || unref(currentActive)) {
          menuState.defaultActive = unref(currentActive);
          setOpeneds(unref(currentActiveMenu));
        }
      });

      function renderItem() {
        return (
          <>
            {unref(menuItems).map((item: Menu) => (
              <BasicSubMenuItem menuItem={item} />
            ))}
          </>
        );
      }
      function renderMenu() {
        return (
          <el-menu
            {...menuProps}
            collapseTransition={false}
            default-active={menuState.defaultActive}
            default-openeds={menuState.defaultOpeneds}
          >
            {renderItem()}
          </el-menu>
        );
      }

      return () => renderMenu();
    },
  });
</script>

<style lang="scss">
  @use './index.scss' as *;
</style>
