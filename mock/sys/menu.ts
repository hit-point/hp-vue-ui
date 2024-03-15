import { resultSuccess, resultError, getRequestToken, requestParams, baseUrl } from '../_util';
import { MockMethod } from 'vite-plugin-mock';
import { createFakeUserList } from './user';

const demoRoute = {
  path: '/components',
  name: 'Components',
  component: 'LAYOUT',
  meta: {
    icon: 'carbon:column-dependency',
    title: 'menus.component.title',
  },
  children: [
    {
      path: 'dialog',
      name: 'Dialog',
      component: '/demo/Dialog.vue',
      meta: {
        title: 'menus.component.dialog',
        icon: 'ep:box',
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
          menu = [demoRoute];
          break;
        case '2':
          menu = [homeRoute, demoRoute];
          break;
        default:
          menu = [];
      }

      return resultSuccess(menu);
    },
  },
] as MockMethod[];
