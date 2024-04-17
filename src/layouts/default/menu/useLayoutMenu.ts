import { Menu } from '/@/router/types';
import { getMenus } from '/@/router/menus';
import { ref, watch } from 'vue';
import { usePermissionStore } from '/@/stores/modules/permission';

export function useMenu() {
  // 菜单路由配置
  const permissionStore = usePermissionStore();
  // 菜单数据
  const menusRef = ref<Menu[]>([]);
  // 数据赋值
  async function genMenus() {
    menusRef.value = await getMenus();
  }

  // BACK路由模式时取菜单数据
  watch(
    () => permissionStore.getBackMenuList,
    () => {
      genMenus();
    },
    {
      immediate: true,
    },
  );

  return { menusRef };
}
