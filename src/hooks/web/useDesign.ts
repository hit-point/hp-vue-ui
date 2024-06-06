import { useAppProviderContext } from '../../components/hp-application/src/useAppContext';

// 全局项目前缀
export function useDesign(scope: string) {
  const values = useAppProviderContext();

  return {
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls,
  };
}
