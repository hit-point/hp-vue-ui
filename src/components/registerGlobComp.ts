import type { App } from 'vue';
import VXETable from 'vxe-table';
import ElementPlus from 'element-plus';
import { MotionPlugin } from '@vueuse/motion';
import 'xe-utils';

export function registerGlobComp(app: App) {
  app.use(VXETable).use(MotionPlugin).use(ElementPlus);
}
