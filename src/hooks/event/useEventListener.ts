import type { Ref } from 'vue';
import { ref, watch, unref } from 'vue';
import { useThrottleFn, useDebounceFn } from '@vueuse/core';

// 清除函数类型
export type RemoveEventFn = () => void;

// 监听参数类型
export interface UseEventParams {
  // 监听容器范围
  el?: Element | Ref<Element | undefined> | Window | any;
  // 监听事件名称
  name: string;
  // 监听执行回调函数
  listener: EventListener;
  // 等同于addEventListener事件委托中第三个参数，多用来处理事件冒泡
  options?: boolean | AddEventListenerOptions;
  // 监听者自动清除上一次监听请求中未完成的网络请求，详情查看watch的清除副作用函数
  autoRemove?: boolean;
  // 为true使用防抖，不断触发只触发一次。为false使用节流，单位时间只触发一次
  isDebounce?: boolean;
  // 防抖节流触发间隔，如果为null则不适用防抖节流
  wait?: number;
}

// 事件监听者
export function useEventListener({
  el = window,
  name,
  listener,
  options,
  autoRemove = true,
  isDebounce = true,
  wait = 80,
}: UseEventParams): { removeEvent: RemoveEventFn } {
  // 清除监听者函数
  let remove: RemoveEventFn = () => {};
  // 防止重复添加监听者
  const isAddRef = ref(false);

  if (el) {
    // 声明需要添加监听者的el
    const element = ref(el as Element) as Ref<Element>;

    // 声明执行函数
    const handler = isDebounce ? useDebounceFn(listener, wait) : useThrottleFn(listener, wait);
    // 声明实际执行函数
    const realHandler = wait ? handler : listener;
    // 移除监听者函数
    const removeEventListener = (e: Element) => {
      isAddRef.value = true;
      e.removeEventListener(name, realHandler, options);
    };
    // 添加监听者函数
    const addEventListener = (e: Element) => e.addEventListener(name, realHandler, options);

    // 监听者
    const removeWatch = watch(
      element,
      (v, _ov, cleanUp) => {
        if (v) {
          !unref(isAddRef) && addEventListener(v);
          cleanUp(() => {
            autoRemove && removeEventListener(v);
          });
        }
      },
      { immediate: true },
    );

    remove = () => {
      removeEventListener(element.value);
      removeWatch();
    };
  }
  return { removeEvent: remove };
}
