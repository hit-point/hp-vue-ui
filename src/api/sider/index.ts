import { SiderResultModel } from './model';
import { defHttp } from '/@/utils/http';

enum Api {
  GETSIDERINFO = '/getSiderInfo',
}

/**
 * @description: 侧边栏列表数据
 */
export function getSiderInfo() {
  return defHttp.get<SiderResultModel>({ url: Api.GETSIDERINFO }, { errorMessageMode: 'message' });
}
