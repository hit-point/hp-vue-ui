import { InjectionKey, Ref } from 'vue';
import { createContext, useContext } from '/@/hooks/core/useContext';

// 全局组件通信参数类型
export interface AppProviderContextProps {
  // 全局样式前缀
  prefixCls: Ref<string>;
  // 窗口是否可更改变量
  isMobile: Ref<boolean>;
}

// 限制了provide导出的数据必须是AppProviderContextProps类型
const key: InjectionKey<AppProviderContextProps> = Symbol();

// Provide
export function createAppProviderContext(context: AppProviderContextProps) {
  return createContext<AppProviderContextProps>(context, key);
}

// inject
export function useAppProviderContext() {
  return useContext<AppProviderContextProps>(key);
}
