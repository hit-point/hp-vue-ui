import { TabListListType } from '/@/components/psc-Tab-list/src/typing';

/**
 * @description: 侧边栏列表组件返回值
 */
export interface TabListResultModel {
  content: TabListListType[];
  page: number;
  pageSize: number;
  total: number;
}
