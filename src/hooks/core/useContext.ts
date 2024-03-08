// 封装provide和project
import {
  InjectionKey,
  provide,
  inject,
  reactive,
  readonly as defineReadonly,
  UnwrapRef,
} from 'vue';

// 设置provide相关参数
export interface CreateContextOptions {
  // provide的数据是否只读
  readonly?: boolean;
  // 是否创建provide
  createProvider?: boolean;
  // 是否使用原本的context
  native?: boolean;
}

/**
 * 举例
    import { ref, UnwrapRef } from 'vue';
    const count = ref(0); // 创建一个响应式数据
    type UnwrappedCount = UnwrapRef<typeof count>; // 使用 UnwrapRef 取消引用类型的嵌套
    function increment(value: UnwrappedCount) {
      value++;
      console.log(value);
    }
    increment(count.value); // 输出: 1
 */
// UnwrapRef类型工具取消引用类型的嵌套
type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>;
};

// provide和inject设置
export function createContext<T>(
  context: any,
  key: InjectionKey<T> = Symbol(),
  options: CreateContextOptions = {},
) {
  const { readonly = true, createProvider = false, native = false } = options;

  const state = reactive(context);
  const provideData = readonly ? defineReadonly(state) : state;
  !createProvider && provide(key, native ? context : provideData);

  return {
    state,
  };
}

export function useContext<T>(key: InjectionKey<T>, native?: boolean): T;

export function useContext<T>(
  key: InjectionKey<T> = Symbol(),
  defaultValue?: any,
): ShallowUnwrap<T> {
  return inject(key, defaultValue || {});
}
