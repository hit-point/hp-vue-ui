import { App } from 'vue';
import { IconifyIconOffline, IconifyIconOnline } from './index';

export function setupIcon(app: App) {
  app.component('IconifyIconOffline', IconifyIconOffline);
  app.component('IconifyIconOnline', IconifyIconOnline);
}
