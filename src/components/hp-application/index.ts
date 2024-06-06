import { withInstall } from '/@/utils';
import appProvider from './src/AppProvider.vue';

/**
 * @description 应用注入样式前缀
 */
export const AppProvider = withInstall(appProvider);
