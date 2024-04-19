import { ErrorTypeEnum } from '/@/enums/exceptionEnum';
import { RoleInfo } from '/@/api/sys/model/userModel';

// 锁定屏幕信息
export interface LockInfo {
  // 需要密码
  pwd?: string | undefined;
  // 是否锁定
  isLock?: boolean;
}

// 错误日志信息
export interface ErrorLogInfo {
  // 错误类型
  type: ErrorTypeEnum;
  // 错误文件
  file: string;
  // 错误名称
  name?: string;
  // 错误消息
  message: string;
  // 错误堆栈
  stack?: string;
  // 错误详细信息
  detail: string;
  // 错误url
  url: string;
  // 错误时间
  time?: string;
}

export interface UserInfo {
  userId: string | number;
  username: string;
  realName: string;
  avatar: string;
  desc?: string;
  homePath?: string;
  roles: RoleInfo[];
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
}
