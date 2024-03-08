import type { ProjectConfig } from '/#/config';

import { computed } from 'vue';

import { useAppStore } from '/@/stores/modules/app';

type RootSetting = Omit<ProjectConfig, 'locale' | 'headerSetting' | 'multiTabsSetting'>;

export function useRootSetting() {
  const appStore = useAppStore();

  const getPageLoading = computed(() => appStore.getPageLoading);

  const getOpenKeepAlive = computed(() => appStore.getProjectConfig.openKeepAlive);

  const getPermissionMode = computed(() => appStore.getProjectConfig.permissionMode);

  const getUseErrorHandle = computed(() => appStore.getProjectConfig.useErrorHandle);

  function setRootSetting(setting: Partial<RootSetting>) {
    appStore.setProjectConfig(setting);
  }

  return {
    setRootSetting,

    getPageLoading,
    getOpenKeepAlive,
    getPermissionMode,
    getUseErrorHandle,
  };
}
