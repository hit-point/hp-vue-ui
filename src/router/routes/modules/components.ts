import type { AppRouteModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';
import { LAYOUT } from '/@/router/constant';

// 多级路由示例
const localCompontents: AppRouteModule = {
  path: '/components',
  name: 'Components',
  component: LAYOUT,
  meta: {
    icon: 'carbon:column-dependency',
    title: t('menus.component.title'),
    orderNo: 2,
    currentActive: '/components/dialog',
    hideChildrenInMenu: false,
  },
  children: [
    {
      path: 'dialog',
      name: 'Dialog',
      component: () => import('/@/views/dialog/index.vue'),
      meta: {
        title: t('menus.component.dialog'),
        icon: 'ep:box',
      },
    },
  ],
};

export default localCompontents;
