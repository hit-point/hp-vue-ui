import type { AppRouteModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';
import { LAYOUT } from '/@/router/constant';

// 一级路由示例
const homeDemo: AppRouteModule = {
  path: '/permission',
  name: 'Permission',
  component: LAYOUT,
  meta: {
    icon: 'carbon:user-role',
    title: t('menus.component.permission'),
    orderNo: 2,
    roles: ['super'],
  },
  children: [
    {
      path: 'page',
      name: 'Page',
      component: () => import('/@/views/permission/page/index.vue'),
      meta: {
        title: t('menus.permission.backPage'),
        currentActive: '/permission/page',
      },
    },
    {
      path: 'button',
      name: 'Button',
      component: () => import('/@/views/permission/button/index.vue'),
      meta: {
        title: t('menus.permission.backBtn'),
        currentActive: '/permission/button',
      },
    },
  ],
};

export default homeDemo;
