import { InjectionKey } from 'vue';
import { createContext, useContext } from '/@/hooks/core/useContext';

// 应用参数类型
export interface AppProviderContextProps {
  // 样式前缀
  prefixCls: string;
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
