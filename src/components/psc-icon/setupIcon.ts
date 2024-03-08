import { App } from 'vue';
import { IconifyIconOffline, IconifyIconOnline, FontIcon } from './index';

export function setupIcon(app: App) {
  app.component('IconifyIconOffline', IconifyIconOffline);
  app.component('IconifyIconOnline', IconifyIconOnline);
  app.component('FontIcon', FontIcon);
}
