import { defHttp } from '/@/utils/http';
import {
  GetUserAuthCaptcha,
  GetUserInfoModel,
  LoginParams,
  LoginResultModel,
} from './model/userModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  LOGIN = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  GetCaptcha = '/captcha',
}

/**
 * @description: 用户登录api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'message') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.LOGIN,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 用户信息
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'message' });
}

/**
 * @description: 用户登录验证码
 */
export function getAuthCapcha() {
  return defHttp.get<GetUserAuthCaptcha>({ url: Api.GetCaptcha }, { errorMessageMode: 'message' });
}

/**
 * @description: 退出登录
 */
export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

/**
 * @description: 用户权限列表
 */
export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}
