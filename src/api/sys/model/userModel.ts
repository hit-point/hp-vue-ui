/**
 * @description: 登录界面参数
 */
export interface LoginParams {
  username: string;
  password: string;
}

/**
 * @description: 角色信息返回字段
 */
export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: 登录界面返回值
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: 获取用户信息返回值
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

/**
 * @description: 获取用户登录验证码
 */
export interface GetUserAuthCaptcha {
  // 登录接口所需验证码key
  captchaKey: string;
  // 验证码图片base64
  captchaBase64: string;
}
