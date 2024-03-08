import { Ref, resolveDynamicComponent, toRaw } from 'vue';
import { useRenderIcon } from '/@/components/psc-icon/src/hooks';
import { Menu as MenuType } from '/@/router/types';
import { useTimeoutFn } from '/@/hooks/core/useTimeout';
import { MenuState } from './types';
import { getAllParentPath } from '/@/router/helper/menuHelper';

export function useDefaultOpeneds(menuState: MenuState, menus: Ref<MenuType[]>) {
  async function setOpeneds(path: string) {
    useTimeoutFn(() => {
      const menuList = toRaw(menus.value);
      if (menuList?.length === 0) {
        menuState.defaultOpeneds = [];
        return;
      }
      menuState.defaultOpeneds = getAllParentPath(menuList, path);
    }, 16);
  }

  return { setOpeneds };
}

export function useMenuIcon() {
  function renderIcon(e: MenuType) {
    return useRenderIcon(e.icon);
  }

  function resolveDynamicComp(element: MenuType) {
    return resolveDynamicComponent(renderIcon(element));
  }

  return { renderIcon, resolveDynamicComp };
}
