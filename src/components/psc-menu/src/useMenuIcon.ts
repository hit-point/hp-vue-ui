import { resolveDynamicComponent } from 'vue';
import { useRenderIcon } from '/@/components/psc-icon/src/hooks';
import { Menu as MenuType } from '/@/router/types';

export function useMenuIcon() {
  function renderIcon(e: MenuType) {
    return useRenderIcon(e.icon);
  }

  function resolveDynamicComp(element: MenuType) {
    return resolveDynamicComponent(renderIcon(element));
  }

  return { renderIcon, resolveDynamicComp };
}
