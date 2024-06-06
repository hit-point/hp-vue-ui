import { createLoading } from '../components/hp-loading';
import type { Directive, App } from 'vue';

const LoadingDirective: Directive = {
  mounted(el, binding) {
    el.className += ' el-loading-parent--relative';
    const fullscreen = !!binding.modifiers.fullscreen;
    const instance = createLoading(
      {
        loading: !!binding.value,
      },
      fullscreen ? document.body : el,
    );
    el.instance = instance;
  },
  updated(el, binding) {
    const instance = el.instance;
    if (!instance) return;
    if (binding.oldValue !== binding.value) {
      instance.setLoading?.(binding.value && !instance.loading);
    }
  },
  unmounted(el) {
    el?.instance?.close();
  },
};

export function setupLoadingDirective(app: App) {
  app.directive('hp-loading', LoadingDirective);
}

export default LoadingDirective;
