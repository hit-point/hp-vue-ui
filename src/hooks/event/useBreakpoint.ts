import { ref, computed, ComputedRef, unref } from 'vue';
import { useEventListener } from '/@/hooks/event/useEventListener';
import { screenMap, sizeEnum, screenEnum } from '/@/enums/breakpointEnum';

// 全局屏幕尺寸，参考sizeEnum
let globalScreenRef: ComputedRef<sizeEnum | undefined>;
// 全局屏幕尺寸对应宽度，参考screenEnum
let globalWidthRef: ComputedRef<number>;
// 全局屏幕页面可见区域宽
let globalRealWidthRef: ComputedRef<number>;

// 回调函数参数类型
export interface CreateCallbackParams {
  screen: ComputedRef<sizeEnum | undefined>;
  width: ComputedRef<number>;
  realWidth: ComputedRef<number>;
  screenEnum: typeof screenEnum;
  screenMap: Map<sizeEnum, number>;
  sizeEnum: typeof sizeEnum;
}

export function useBreakpoint() {
  return {
    screenRef: computed(() => unref(globalScreenRef)),
    widthRef: globalWidthRef,
    screenEnum,
    realWidthRef: globalRealWidthRef,
  };
}

// 断点监听函数只需执行一次
export function createBreakpointListen(fn?: (opt: CreateCallbackParams) => void) {
  // 屏幕尺寸
  const screenRef = ref<sizeEnum>(sizeEnum.XL);
  // 窗口的文档显示区宽度，包括滚动条高度
  const realWidthRef = ref(window.innerWidth);

  /**
   * 确定屏幕尺寸和窗口的文档显示区宽度
   */
  function getWindowWidth() {
    // 页面可见区域宽
    const width = document.body.clientWidth;
    // !非空类型断言，表示确定某个标识符是有值的
    const xs = screenMap.get(sizeEnum.XS)!;
    const sm = screenMap.get(sizeEnum.SM)!;
    const md = screenMap.get(sizeEnum.MD)!;
    const lg = screenMap.get(sizeEnum.LG)!;
    const xl = screenMap.get(sizeEnum.XL)!;
    // 由小到大确定屏幕尺寸480-1600
    if (width < xs) {
      screenRef.value = sizeEnum.XS;
    } else if (width < sm) {
      screenRef.value = sizeEnum.SM;
    } else if (width < md) {
      screenRef.value = sizeEnum.MD;
    } else if (width < lg) {
      screenRef.value = sizeEnum.LG;
    } else if (width < xl) {
      screenRef.value = sizeEnum.XL;
    } else {
      screenRef.value = sizeEnum.XXL;
    }
    // 取页面可见区域宽
    realWidthRef.value = width;
  }

  // addEventListener设置监听器，包含removeEventListener清除监听器
  // 返回值是清除函数，此处没有使用
  useEventListener({
    // 监听容器范围
    el: window,
    // 监听器名称
    name: 'resize',
    // 监听器回调函数，也就是addEventListener和removeEventListener的第二个参数
    listener: () => {
      getWindowWidth();
      resizeFn();
    },
    // wait: 100,
  });

  // 首次获取窗口宽度
  getWindowWidth();
  // 全局屏幕尺寸
  globalScreenRef = computed(() => unref(screenRef));
  // 全局屏幕尺寸对应宽度
  globalWidthRef = computed((): number => screenMap.get(unref(screenRef)!)!);
  // 全局屏幕页面可见区域宽
  globalRealWidthRef = computed((): number => unref(realWidthRef));

  // 回调函数赋参
  function resizeFn() {
    fn?.({
      screen: globalScreenRef,
      width: globalWidthRef,
      realWidth: globalRealWidthRef,
      screenEnum,
      screenMap,
      sizeEnum,
    });
  }

  // 回调函数首次赋参
  resizeFn();
  return {
    screenRef: globalScreenRef,
    screenEnum,
    widthRef: globalWidthRef,
    realWidthRef: globalRealWidthRef,
  };
}
