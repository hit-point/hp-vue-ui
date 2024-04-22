import { resultSuccess, resultError, getRequestToken, requestParams, baseUrl } from '../_util';
import { MockMethod } from 'vite-plugin-mock';
import { createFakeUserList } from './user';

// 首页
const homeRoute = {
  path: '/home',
  name: 'HomeParent',
  component: 'LAYOUT',
  meta: {
    title: 'menus.home',
    icon: 'homeFilled',
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
        // icon: 'carbon:home',
      },
    },
  ],
};

// 模块
const modulesRoute = {
  path: '/demo',
  name: 'Modules',
  component: 'LAYOUT',
  meta: {
    icon: 'menu',
    // icon: 'majesticons:qr-code-line',
    title: 'menus.modules.title',
  },
  children: [
    {
      path: 'dialog',
      name: 'Dialog',
      component: '/demo/dialog/index.vue',
      meta: {
        title: 'menus.modules.dialog',
        currentActive: '/demo/dialog',
      },
    },
    {
      path: 'readonly',
      name: 'Readonly',
      component: '/demo/readonly/index.vue',
      meta: {
        title: 'menus.modules.readonly',
        currentActive: '/demo/readonly',
      },
    },
    {
      path: 'button',
      name: 'BtnComp',
      component: '/demo/button/index.vue',
      meta: {
        title: 'menus.modules.button',
        currentActive: '/demo/button',
      },
    },
    {
      path: 'form',
      name: 'Form',
      component: '/demo/form/index.vue',
      meta: {
        title: 'menus.modules.form',
        currentActive: '/demo/form',
      },
    },
    {
      path: 'list',
      name: 'List',
      component: '/demo/list/index.vue',
      meta: {
        title: 'menus.modules.list',
        currentActive: '/demo/list',
      },
    },
    {
      path: 'outside',
      name: 'OSComp',
      component: '/demo/outside/index.vue',
      meta: {
        title: 'menus.modules.outside',
        currentActive: '/demo/outside',
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
    icon: 'guide',
    // icon: 'majesticons:academic-cap',
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
    {
      path: 'loading',
      name: 'Loading',
      component: '/directives/loading/index.vue',
      meta: {
        title: 'menus.directives.loading',
        currentActive: '/directives/loading',
      },
    },
    {
      path: 'outside',
      name: 'Outside',
      component: '/directives/outside/index.vue',
      meta: {
        title: 'menus.directives.outside',
        currentActive: '/directives/outside',
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
    icon: 'flUser',
    // icon: 'carbon:user-role',
    title: 'menus.permission.title',
  },
  children: [
    {
      path: 'page',
      name: 'Page',
      component: '/permission/page/index.vue',
      meta: {
        title: 'menus.permission.backPage',
        currentActive: '/permission/page',
      },
    },
    {
      path: 'button',
      name: 'Button',
      component: '/permission/button/index.vue',
      meta: {
        title: 'menus.permission.backBtn',
        currentActive: '/permission/button',
      },
    },
  ],
};

// 系统管理
const systemRoute = {
  path: '/system',
  name: 'System',
  component: 'LAYOUT',
  meta: {
    icon: 'setting',
    // icon: 'carbon:settings',
    title: 'menus.system.title',
  },
  children: [
    {
      path: 'user',
      name: 'User',
      component: '/sys/user/index.vue',
      meta: {
        title: 'menus.system.user',
        currentActive: '/system/user',
      },
    },
    {
      path: 'role',
      name: 'Role',
      component: '/sys/role/index.vue',
      meta: {
        title: 'menus.system.role',
        currentActive: '/system/role',
      },
    },
    {
      path: 'menu',
      name: 'Menu',
      component: '/sys/menu/index.vue',
      meta: {
        title: 'menus.system.menu',
        currentActive: '/system/menu',
      },
    },
    {
      path: 'dept',
      name: 'Dept',
      component: '/sys/dept/index.vue',
      meta: {
        title: 'menus.system.dept',
        currentActive: '/system/dept',
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
          menu = [homeRoute, backRoute, directivesRoute, modulesRoute, systemRoute];
          break;
        case '2':
          menu = [homeRoute, directivesRoute, modulesRoute];
          break;
        default:
          menu = [];
      }

      return resultSuccess(menu);
    },
  },
] as MockMethod[];
