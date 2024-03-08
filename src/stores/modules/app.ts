import type { ProjectConfig, MenuSetting, HeaderSetting, TransitionSetting } from '/#/config';

import { defineStore } from 'pinia';
import { store } from '/@/stores';

import { PROJ_CFG_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { resetRouter } from '/@/router';
import { deepMerge } from '/@/utils';
import { BeforeMiniState } from '/#/store';

interface AppState {
  // 页面加载状态
  pageLoading: boolean;
  // 项目配置
  projectConfig: ProjectConfig | null;
  // 当窗口缩小时，记住一些状态，并在窗口恢复时恢复这些状态
  beforeMiniInfo: BeforeMiniState;
}
let timeId: TimeoutHandle;
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    beforeMiniInfo: {},
  }),
  getters: {
    getPageLoading(state): boolean {
      return state.pageLoading;
    },
    getBeforeMiniInfo(state): BeforeMiniState {
      return state.beforeMiniInfo;
    },
    getProjectConfig(state): ProjectConfig {
      return state.projectConfig || ({} as ProjectConfig);
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting;
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },

    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },

    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config) as ProjectConfig;
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },

    async resetAllState() {
      resetRouter();
      Persistent.clearAll();
    },

    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        // 防止闪烁
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
  },
});

// 需要在设置之外使用
export function useAppStoreWithOut() {
  return useAppStore(store);
}
