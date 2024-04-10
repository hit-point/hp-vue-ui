/**
 * 配置和注册全局指令
 */
import type { App } from 'vue';
import { setupPermissionDirective } from './permission';
import { setupLoadingDirective } from './loading';
import { setupRepeatDirective } from './repeatClick';
import { setupRippleDirective } from './ripple';

export function setupGlobDirectives(app: App) {
  // 权限
  setupPermissionDirective(app);
  // 仿antd加载
  setupLoadingDirective(app);
  // 防止重复点击
  setupRepeatDirective(app);
  // 水波纹
  setupRippleDirective(app);
}
