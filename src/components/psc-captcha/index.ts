import basicCaptcha from './src/index.vue';
import { withInstall } from '/@/utils';

/**
 * @description 图形验证码组件
 */
export const BasicCaptcha = withInstall(basicCaptcha);

/**
 * @description 图形验证码函数
 */
export { useCaptcha } from './src/useCaptcha';
