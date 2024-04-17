import { resultSuccess, resultError, getRequestToken, requestParams, baseUrl } from '../_util';
import { MockMethod } from 'vite-plugin-mock';
import { createFakeUserList } from './user';

const tablistInfo = {
  content: [
    {
      id: 1,
      name: '示例数据1',
      createBy: '示例数据创建人1',
    },
    {
      id: 2,
      name: '示例数据2',
      createBy: '示例数据创建人2',
    },
    {
      id: 3,
      name: '示例数据3',
      createBy: '示例数据创建人3',
    },
    {
      id: 4,
      name: '示例数据4',
      createBy: '示例数据创建人4',
    },
    {
      id: 5,
      name: '示例数据5',
      createBy: '示例数据创建人5',
    },
    {
      id: 6,
      name: '示例数据6',
      createBy: '示例数据创建人6',
    },
  ],
  page: 1,
  pageSize: 10,
  total: 100,
};

export default [
  {
    url: `${baseUrl}/getTabListInfo`,
    timeout: 1000,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return resultError('Invalid token!');
      }
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid user token!');
      }
      const id = checkUser.userId;
      let menu: Object;
      switch (id) {
        case '1':
          menu = tablistInfo;
          break;
        case '2':
          menu = tablistInfo;
          break;
        default:
          menu = {};
      }

      return resultSuccess(menu);
    },
  },
] as MockMethod[];
