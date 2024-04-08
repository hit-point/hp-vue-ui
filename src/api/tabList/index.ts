import { TabListResultModel } from './model';
import { defHttp } from '/@/utils/http';

enum Api {
  GETTABLISTINFO = '/getTabListInfo',
}

/**
 * @description: 侧边栏列表数据
 */
export function getTabListInfo() {
  return defHttp.get<TabListResultModel>(
    { url: Api.GETTABLISTINFO },
    { errorMessageMode: 'message' },
  );
}
