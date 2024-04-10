import { resultSuccess, resultError, getRequestToken, requestParams, baseUrl } from '../_util';
import { MockMethod } from 'vite-plugin-mock';
import { createFakeUserList } from './user';

// 首页
const homeRoute = {
  path: '/home',
  name: 'HomeParent',
  component: 'LAYOUT',
  redirect: '/home',
  meta: {
    title: 'menus.home',
    icon: 'carbon:home',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      name: 'Home',
      component: '/home/index.vue',
      meta: {
        hideMenu: true,
        title: 'menus.home',
        currentActive: '/home',
        icon: 'carbon:home',
      },
    },
  ],
};

// 国际化
const localesRoute = {
  path: '/locales',
  name: 'LocalesParent',
  component: 'LAYOUT',
  redirect: '/locales/index',
  meta: {
    title: 'menus.locales',
    icon: 'ion:language',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      name: 'Locales',
      component: '/locales/index.vue',
      meta: {
        hideMenu: true,
        title: 'menus.locales',
        currentActive: '/locales',
        icon: 'ion:language',
      },
    },
  ],
};

// 模块
const componentsRoute = {
  path: '/components',
  name: 'Components',
  component: 'LAYOUT',
  meta: {
    icon: 'majesticons:qr-code-line',
    title: 'menus.component.title',
  },
  children: [
    {
      path: 'dialog',
      name: 'Dialog',
      component: '/components/dialog/index.vue',
      meta: {
        title: 'menus.component.dialog',
        currentActive: '/components/dialog',
      },
    },
    {
      path: 'readonly',
      name: 'Readonly',
      component: '/components/readonly/index.vue',
      meta: {
        title: 'menus.component.readonly',
        currentActive: '/components/readonly',
      },
    },
    {
      path: 'button',
      name: 'Button',
      component: '/components/button/index.vue',
      meta: {
        title: 'menus.component.button',
        currentActive: '/components/button',
      },
    },
  ],
};

// 自定义指令
const directivesRoute = {
  path: '/directives',
  name: 'Directives',
  component: 'LAYOUT',
  meta: {
    icon: 'majesticons:academic-cap',
    title: 'menus.directives.title',
  },
  children: [
    {
      path: 'repeat',
      name: 'Repeat',
      component: '/directives/repeat/index.vue',
      meta: {
        title: 'menus.directives.repeat',
        currentActive: '/directives/repeat',
      },
    },
    {
      path: 'ripple',
      name: 'Ripple',
      component: '/directives/ripple/index.vue',
      meta: {
        title: 'menus.directives.ripple',
        currentActive: '/directives/ripple',
      },
    },
  ],
};

// 权限管理
const backRoute = {
  path: '/permission',
  name: 'Permission',
  component: 'LAYOUT',
  meta: {
    icon: 'carbon:user-role',
    title: 'menus.component.permission',
  },
  children: [
    {
      path: 'btn',
      name: 'Btn',
      component: '/permission/Btn',
      meta: {
        title: 'menus.permission.backBtn',
        currentActive: '/permission/btn',
      },
    },
  ],
};

export default [
  {
    url: `${baseUrl}/getMenuList`,
    timeout: 1000,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return resultError('Invalid token!');
      }
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid user token!');
      }
      const id = checkUser.userId;
      let menu: Object[];
      switch (id) {
        case '1':
          menu = [homeRoute, localesRoute, backRoute, directivesRoute, componentsRoute];
          break;
        case '2':
          menu = [homeRoute, localesRoute, backRoute, directivesRoute, componentsRoute];
          break;
        default:
          menu = [];
      }

      return resultSuccess(menu);
    },
  },
] as MockMethod[];
