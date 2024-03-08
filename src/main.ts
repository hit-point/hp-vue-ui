import './style/tailwind.scss';
import { createApp } from 'vue';

import App from './App.vue';
import { router, setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { setupGlobDirectives } from '/@/directives';
import { registerGlobComp } from '/@/components/registerGlobComp';
import { setupErrorHandle } from './logics/error-handle';
import { initAppConfigStore } from '/@/logics/initAppConfig';
import { setupStore } from '/@/stores';
import { setupI18n } from '/@/locales/setupI18n';
import { setupIcon } from '/@/components/psc-icon/setupIcon';

import 'vxe-table/lib/style.css';
import 'element-plus/dist/index.css';

import './style/index.scss';
// 引入本地图标
import '/@/components/psc-icon/src/offlineIcon';

async function bootstrap() {
  const app = createApp(App);

  // 配置 store
  setupStore(app);

  // 初始化内部系统配置
  initAppConfigStore();

  // 注册全局组件
  registerGlobComp(app);

  // 多语言配置
  // 异步案例：语言文件可能从服务器端获取
  await setupI18n(app);

  // 配置路由
  setupRouter(app);

  // 路由守卫
  setupRouterGuard(router);

  // 注册全局指令
  setupGlobDirectives(app);

  // 配置全局错误处理，useErrorHandle为false时不启用
  setupErrorHandle(app);

  // 全局注册`@iconify/vue`图标库
  setupIcon(app);

  app.mount('#app');
}

bootstrap();
