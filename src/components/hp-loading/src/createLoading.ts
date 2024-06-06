import { VNode, defineComponent } from 'vue';

import { createVNode, render, reactive, h } from 'vue';
import BasicLoading from './BasicLoading.vue';

export function createLoading(props?: Partial<{ loading: boolean }>, target?: HTMLElement) {
  let vm: Nullable<VNode> = null;
  const data = reactive({
    loading: true,
    ...props,
  });

  const LoadingWrap = defineComponent({
    render() {
      return h(BasicLoading, { ...data });
    },
  });

  vm = createVNode(LoadingWrap);

  render(vm, document.createElement('div'));

  function close() {
    if (vm?.el && vm.el.parentNode) {
      vm.el.parentNode.removeChild(vm.el);
    }
  }

  function open(target: HTMLElement = document.body) {
    if (!vm || !vm.el) {
      return;
    }
    target.appendChild(vm.el as HTMLElement);
  }

  if (target) {
    open(target);
  }
  return {
    vm,
    close,
    open,
    setLoading: (loading: boolean) => {
      data.loading = loading;
    },
    get loading() {
      return data.loading;
    },
    get $el() {
      return vm?.el as HTMLElement;
    },
  };
}
