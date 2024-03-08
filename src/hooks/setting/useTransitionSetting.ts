import type { TransitionSetting } from '/#/config';

import { computed } from 'vue';

import { useAppStore } from '/@/stores/modules/app';

// 关于加载过渡的项目配置
export function useTransitionSetting() {
  const appStore = useAppStore();

  const getEnableTransition = computed(() => appStore.getTransitionSetting?.enable);

  const getOpenNProgress = computed(() => appStore.getTransitionSetting?.openNProgress);

  const getOpenPageLoading = computed((): boolean => {
    return !!appStore.getTransitionSetting?.openPageLoading;
  });

  const getBasicTransition = computed(() => appStore.getTransitionSetting?.basicTransition);

  function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    appStore.setProjectConfig({ transitionSetting });
  }

  return {
    setTransitionSetting,
    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
  };
}
