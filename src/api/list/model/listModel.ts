import { ListType } from '../../../components/hp-list/src/types';

/**
 * @description: 侧边栏列表组件返回值
 */
export interface TabListResultModel {
  content: ListType[];
  page: number;
  pageSize: number;
  total: number;
}
