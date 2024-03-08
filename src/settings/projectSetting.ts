import type { ProjectConfig } from '/#/config';
import { MenuModeEnum, TriggerEnum, MenuTriggerEnum } from '/@/enums/menuEnum';
import { CacheTypeEnum } from '/@/enums/cacheEnum';
import {
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SessionTimeoutProcessingEnum,
} from '/@/enums/appEnum';
import { SIDE_BAR_BG_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST } from './designSetting';
// ! 更改后需要清除浏览器缓存
const setting: ProjectConfig = {
  // 权限模式
  permissionMode: PermissionModeEnum.BACK,

  // 与权限相关的缓存存储在sessionStorage或localStorage中
  permissionCacheType: CacheTypeEnum.LOCAL,

  // 会话超时处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,

  // 封头结构
  headerSetting: {
    // header bg color
    bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
    // 固定在顶部
    fixed: true,
    // 是否显示顶部
    show: true,
    // 主题模式
    theme: ThemeEnum.LIGHT,
    // 是否启用锁屏功能
    useLockPage: true,
    // 是否显示全屏按钮
    showFullScreen: true,
    // 是否显示文档按钮
    showDoc: true,
    // 是否显示通知按钮
    showNotice: true,
    // 是否显示菜单搜索
    showSearch: true,
  },

  // 菜单配置
  menuSetting: {
    // 侧边栏菜单bg颜色
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    // 菜单折叠
    collapsed: false,
    // 菜单宽度
    menuWidth: 210,
    // 菜单模式
    mode: MenuModeEnum.VERTICAL,
    // 菜单主题
    theme: ThemeEnum.DARK,
    // 折叠触发器位置
    trigger: TriggerEnum.HEADER,
    // 打开手风琴模式，仅显示菜单
    uniqueOpened: true,
    // 模块打开方法 ‘click’ |'hover'
    menuTrigger: MenuTriggerEnum.CLICK,
  },

  // 过渡设置
  transitionSetting: {
    // 是否打开页面切换动画
    // 禁用状态还将禁用页面加载
    enable: true,

    // 路由基本切换动画
    basicTransition: RouterTransitionEnum.FADE_TRANSFORM,

    // 是否打开页面切换加载
    // 仅当enable=true时打开
    openPageLoading: true,

    // 是否打开顶部进度条
    openNProgress: true,
  },

  // 是否启用KeepAlive缓存最好在开发期间关闭，否则每次都需要清除缓存
  openKeepAlive: true,

  // 使用错误处理程序插件
  useErrorHandle: false,

  // 切换接口时是否删除未关闭的消息并通知
  closeMessageOnSwitch: true,

  // 切换路由时是否取消已发送但未响应的http请求
  // 如果启用了它，我想覆盖单个接口。可以在单独的界面中设置
  removeAllHttpPending: false,
};

export default setting;
