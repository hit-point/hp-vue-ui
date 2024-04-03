/**
 * 注意name不要重复
 * orderNo: 从小到大排序
 * currentActive: 默认激活路径
 * hideChildrenInMenu: 隐藏子路由
 * hideBreadcrumb: 不计入面包屑导航头
 * hideMenu: 隐藏对应menu
 */
import { EXCEPTION_COMPONENT, LAYOUT, PAGE_NOT_FOUND_NAME } from '../constant';
import { AppRouteRecordRaw } from '../types';

// 404页面
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: EXCEPTION_COMPONENT,
      meta: {},
    },
  ],
};

// 错误页面
export const ERROR_LOG_ROUTE: AppRouteRecordRaw = {
  path: '/error-log',
  name: 'ErrorLog',
  component: LAYOUT,
  meta: {
    currentActive: '/error-log',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      name: 'ErrorLog',
      component: () => import('/@/views/sys/error-log/index.vue'),
      meta: {},
    },
  ],
};
