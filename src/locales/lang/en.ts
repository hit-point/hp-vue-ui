import { genMessage } from '../helper';
import VXETableLocale from 'vxe-table/lib/locale/lang/en-US';

const modules = import.meta.glob('./en/**/*.ts', { eager: true, import: 'default' });
export default {
  message: {
    ...genMessage(modules, 'en'),
    ...VXETableLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en',
};
