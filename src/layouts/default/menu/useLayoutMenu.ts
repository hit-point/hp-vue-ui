import { Menu } from '/@/router/types';
import { getMenus } from '/@/router/menus';
import { ref, watch } from 'vue';
import { usePermissionStore } from '/@/stores/modules/permission';

export function useSplitMenu() {
  const permissionStore = usePermissionStore();
  const menusRef = ref<Menu[]>([]);
  async function genMenus() {
    menusRef.value = await getMenus();
  }

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
