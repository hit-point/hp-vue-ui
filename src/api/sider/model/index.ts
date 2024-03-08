import { SiderListType } from '/@/components/psc-sider-list/src/typing';

/**
 * @description: 侧边栏列表返回值
 */
export interface SiderResultModel {
  content: SiderListType[];
  page: number;
  pageSize: number;
  total: number;
}
