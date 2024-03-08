import type { AppRouteModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';
import { LAYOUT } from '/@/router/constant';

// 一级路由示例
const localDemo: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  meta: {
    icon: 'carbon:home',
    title: t('menus.home'),
    orderNo: 1,
    currentActive: '/home',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      name: 'HomePage',
      component: () => import('/@/views/home/index.vue'),
      meta: {
        title: t('menus.home'),
        icon: 'carbon:home',
      },
    },
  ],
};

export default localDemo;
