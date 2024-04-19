import { TabListResultModel } from './model/listModel';
import { defHttp } from '/@/utils/http';

enum Api {
  GETlISTINFO = '/getListInfo',
}

/**
 * @description: 侧边栏列表数据
 */
export function getListInfo() {
  return defHttp.get<TabListResultModel>({ url: Api.GETlISTINFO }, { errorMessageMode: 'message' });
}
