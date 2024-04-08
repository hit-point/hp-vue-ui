import { resultSuccess, resultError, getRequestToken, requestParams, baseUrl } from '../_util';
import { MockMethod } from 'vite-plugin-mock';
import { createFakeUserList } from './user';

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
        icon: 'majesticons:browser',
        currentActive: '/components/dialog',
      },
    },
  ],
};

const homeRoute = {
  path: 'home',
  name: 'Home',
  component: '/home/index.vue',
  meta: {
    title: 'menus.home',
    icon: 'carbon:home',
    currentActive: '/home',
    hideMenu: false,
  },
};

const exceptionRoute = {
  path: 'error-log',
  name: 'ErrorLog',
  component: '/sys/error-log/index.vue',
  meta: {
    title: 'menus.errorLog',
    icon: 'majesticons:alert-circle',
    currentActive: '/error-log',
    hideMenu: false,
  },
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
          menu = [homeRoute, componentsRoute, exceptionRoute];
          break;
        case '2':
          menu = [homeRoute, componentsRoute, exceptionRoute];
          break;
        default:
          menu = [];
      }

      return resultSuccess(menu);
    },
  },
] as MockMethod[];
