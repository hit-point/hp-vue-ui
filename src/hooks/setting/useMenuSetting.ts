import type { MenuSetting } from '/#/config';

import { computed, unref, ref } from 'vue';

import { useAppStore } from '/@/stores/modules/app';

import { MenuModeEnum } from '/@/enums/menuEnum';

const mixSideHasChildren = ref(false);

export function useMenuSetting() {
  const appStore = useAppStore();

  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);

  const getMenuMode = computed(() => appStore.getMenuSetting.mode);

  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth);

  const getTrigger = computed(() => appStore.getMenuSetting.trigger);

  const getMenuTheme = computed(() => appStore.getMenuSetting.theme);

  const getMenuBgColor = computed(() => appStore.getMenuSetting.bgColor);

  const getMenuTrigger = computed(() => appStore.getMenuSetting.menuTrigger);

  const getUniqueOpened = computed(() => appStore.getMenuSetting.uniqueOpened);

  const getIsHorizontal = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL;
  });

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting });
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    });
  }
  return {
    setMenuSetting,

    toggleCollapsed,

    getMenuMode,
    getCollapsed,
    getMenuWidth,
    getTrigger,
    getMenuTheme,
    getIsHorizontal,
    getUniqueOpened,
    getMenuBgColor,
    getMenuTrigger,
    mixSideHasChildren,
  };
}
