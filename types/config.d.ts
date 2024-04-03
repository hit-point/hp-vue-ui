import {
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SessionTimeoutProcessingEnum,
} from '/@/enums/appEnum';
import { MenuModeEnum, TriggerEnum, MenuTriggerEnum } from '/@/enums/menuEnum';

import { CacheTypeEnum } from '/@/enums/cacheEnum';

export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko';

export interface MenuSetting {
  bgColor: string;
  textColor: string;
  activeTextColor: string;
  collapsed: boolean;
  menuWidth: number;
  mode: MenuModeEnum;
  theme: ThemeEnum;
  trigger: TriggerEnum;
  uniqueOpened: boolean;
  menuTrigger: MenuTriggerEnum;
}

export interface HeaderSetting {
  bgColor: string;
  fixed: boolean;
  show: boolean;
  theme: ThemeEnum;
  // 打开全屏
  showFullScreen: boolean;
  // 是否显示锁定屏幕
  useLockPage: boolean;
  // “显示文档”按钮
  showDoc: boolean;
  // 显示消息中心按钮
  showNotice: boolean;
  showSearch: boolean;
}

export interface LocaleSetting {
  showPicker: boolean;
  // 当前语言
  locale: LocaleType;
  // 默认语言
  fallback: LocaleType;
  // 可用的区域设置
  availableLocales: LocaleType[];
}

export interface TransitionSetting {
  // 是否打开页面切换动画
  enable: boolean;
  // 路由基本切换动画
  basicTransition: RouterTransitionEnum;
  // 是否打开页面切换加载
  openPageLoading: boolean;
  // 是否打开顶部进度条
  openNProgress: boolean;
}

export interface ProjectConfig {
  // 权限相关信息的存储位置
  permissionCacheType: CacheTypeEnum;
  // 权限模式
  permissionMode: PermissionModeEnum;
  // 会话超时处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;

  // menuType: MenuTypeEnum;
  headerSetting: HeaderSetting;
  // menu配置
  menuSetting: MenuSetting;
  // 多选项卡配置
  multiTabsSetting: MultiTabsSetting;
  // 动画配置
  transitionSetting: TransitionSetting;
  // pageLayout是否启用keep-alive
  openKeepAlive: boolean;
  // 使用错误处理程序插件
  useErrorHandle: boolean;
  // 切换接口时是否删除未关闭的消息并通知
  closeMessageOnSwitch: boolean;
  // 切换接口时是否取消已发送但未响应的http请求
  removeAllHttpPending: boolean;
}

export interface GlobConfig {
  // 站点名称
  title: string;
  // 服务接口url
  apiUrl: string;
  // 上传url
  uploadUrl?: string;
  // 服务接口url前缀
  urlPrefix?: string;
  // 项目简称
  shortName: string;
}
export interface GlobEnvConfig {
  // 站点名称
  VITE_GLOB_APP_TITLE: string;
  // 服务接口url
  VITE_GLOB_API_URL: string;
  // 服务接口url前缀
  VITE_GLOB_API_URL_PREFIX?: string;
  // 项目简称
  VITE_GLOB_APP_SHORT_NAME: string;
  // 上传url
  VITE_GLOB_UPLOAD_URL?: string;
}
