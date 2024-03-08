import { genMessage } from '../helper';
import VXETableLocale from 'vxe-table/lib/locale/lang/zh-CN';

const modules = import.meta.glob('./zh-CN/**/*.ts', { eager: true, import: 'default' });
export default {
  message: {
    ...genMessage(modules, 'zh-CN'),
    ...VXETableLocale,
  },
};
