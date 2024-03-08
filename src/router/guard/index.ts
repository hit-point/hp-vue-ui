import type { RouteLocationNormalized, Router } from 'vue-router';
import { setRouteChange } from '/@/logics/mitt/routeChange';
import { unref } from 'vue';
import { useAppStoreWithOut } from '/@/stores/modules/app';
import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
import projectSetting from '/@/settings/projectSetting';
import { AxiosCanceler } from '/@/utils/http/axios/axiosCancel';
import { warn } from '/@/utils/log';
import nProgress from 'nprogress';
import { closeAllMessage } from '/@/utils/message';
import { ElMessage } from 'element-plus';
import { createPermissionGuard } from './permissionGuard';
import { createStateGuard } from './stateGuard';

// 注意，这里不要更改创建顺序
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  createPageLoadingGuard(router);
  createHttpGuard(router);
  createScrollGuard(router);
  createMessageGuard(router);
  createProgressGuard(router);
  createPermissionGuard(router);
  createStateGuard(router);
}

/**
 * 用于处理页面状态的挂钩
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>();

  router.beforeEach(async (to) => {
    // 页面已经加载，再次打开会更快，不需要进行加载和其他处理
    to.meta.loaded = !!loadedPageMap.get(to.path);
    // 通知路由更改
    // 内部使用mitt派发自定义事件
    setRouteChange(to);

    return true;
  });

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true);
  });
}

// 用于处理页面加载状态
function createPageLoadingGuard(router: Router) {
  // const userStore = useUserStoreWithOut();
  const appStore = useAppStoreWithOut();
  const { getOpenPageLoading } = useTransitionSetting();

  router.beforeEach(async (to) => {
    // if (!userStore.getToken) {
    //   return true;
    // }
    if (to.meta.loaded) {
      return true;
    }

    if (unref(getOpenPageLoading)) {
      appStore.setPageLoadingAction(true);
      return true;
    }

    return true;
  });
  router.afterEach(async () => {
    if (unref(getOpenPageLoading)) {
      // 计时器模拟加载时间以防止闪烁过快,
      setTimeout(() => {
        appStore.setPageLoading(false);
      }, 220);
    }
    return true;
  });
}

/**
 * 路由切换时用于关闭当前页面已完成请求的接口
 * @param router
 */
function createHttpGuard(router: Router) {
  const { removeAllHttpPending } = projectSetting;
  let axiosCanceler: Nullable<AxiosCanceler>;
  if (removeAllHttpPending) {
    axiosCanceler = new AxiosCanceler();
  }
  router.beforeEach(async () => {
    // 切换路由将删除以前的请求
    axiosCanceler?.removeAllPending();
    return true;
  });
}

// 回顶部的路由开关
// 只在hash路由模式下触发
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    // 匹配hash路由的#
    // 替换createWebHistory为createWebHashHistory即可更换为hash路由
    return /^#/.test(href);
  };

  const body = document.body;

  router.afterEach(async (to) => {
    // 滚动到顶部
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0);

    return true;
  });
}

/**
 * 用于在路由切换时关闭消息实例
 * @param router
 */
export function createMessageGuard(router: Router) {
  const { closeMessageOnSwitch } = projectSetting;

  router.beforeEach(async () => {
    try {
      if (closeMessageOnSwitch) {
        // 此处可按需添加各自清除提示的函数，取决于项目使用到的部分
        // 关闭所有message函数创建的提示
        closeAllMessage();
        ElMessage.closeAll();
      }
    } catch (error) {
      warn('message guard error:' + error);
    }
    return true;
  });
}

// 配合createPageLoadingGuard展示nprogress进度条
export function createProgressGuard(router: Router) {
  const { getOpenNProgress } = useTransitionSetting();

  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true;
    }

    unref(getOpenNProgress) && nProgress.start();
    return true;
  });

  router.afterEach(async () => {
    unref(getOpenNProgress) && nProgress.done();
    return true;
  });
}
