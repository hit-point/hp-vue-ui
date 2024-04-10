import { TabListListType } from '../../../components/psc-tab-list/src/types';

/**
 * @description: 侧边栏列表组件返回值
 */
export interface TabListResultModel {
  content: TabListListType[];
  page: number;
  pageSize: number;
  total: number;
}
