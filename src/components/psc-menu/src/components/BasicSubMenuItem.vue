<script lang="tsx">
  import { PropType, computed, defineComponent, unref } from 'vue';
  import { Menu as MenuType } from '/@/router/types';
  import BasicMenuItem from './BasicMenuItem.vue';
  import BasicSubMenuItem from './BasicSubMenuItem.vue';
  import MenuItemContent from './MenuItemContent.vue';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  export default defineComponent({
    name: 'BasicSubMenuItem',
    props: {
      menuItem: {
        type: Object as PropType<MenuType>,
        default: () => {},
      },
    },
    setup(props) {
      const { getMenuChildrenBgColor } = useMenuSetting();
      const getShowMenu = computed(() => !props.menuItem.meta?.hideMenu);
      function renderTitleItem(item: MenuType) {
        return {
          title: () => <MenuItemContent menuItem={item} />,
        };
      }

      function renderMenuItem(element: MenuType) {
        return <BasicMenuItem menuItem={element} />;
      }

      function renderChildrenComp() {
        return (
          <>
            {props.menuItem.children?.map((element: MenuType) => (
              <BasicSubMenuItem
                menuItem={element}
                style={{ backgroundColor: unref(getMenuChildrenBgColor) }}
              />
            ))}
          </>
        );
      }

      function menuHasChildren(menuTreeItem: MenuType): boolean {
        return (
          !menuTreeItem.meta?.hideChildrenInMenu &&
          Reflect.has(menuTreeItem, 'children') &&
          !!menuTreeItem.children &&
          menuTreeItem.children.length > 0
        );
      }

      function renderSubMenuComp() {
        return (
          <>
            <el-sub-menu index={props.menuItem.path} v-slots={renderTitleItem(props.menuItem)}>
              {renderChildrenComp()}
            </el-sub-menu>
          </>
        );
      }

      function renderItem() {
        return menuHasChildren(props.menuItem)
          ? renderSubMenuComp()
          : renderMenuItem(props.menuItem);
      }
      return () => (unref(getShowMenu) ? renderItem() : null);
    },
  });
</script>
