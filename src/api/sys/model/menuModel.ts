export interface RouteMeta {
  // 是否隐藏子菜单
  hideChildrenInMenu?: boolean;
  // 是否隐藏菜单
  hideMenu?: boolean;
  // 是否隐藏面包屑导航
  hideBreadcrumb?: boolean;
  // 是否隐藏标签卡
  hideTab?: boolean;
  // 是否在没有权限的情况下访问
  ignoreAuth?: boolean;
  // 是否忽略缓存选项
  ignoreKeepAlive?: boolean;
  // 是否隐藏菜单项path
  hidePathForChildren?: boolean;
  // 有children的菜单生效，该多级菜单是否只显示children里的首项，path取首项的
  single?: boolean;
  // layout的content部分动画效果类名，对应transition的name字段
  // 自定义需定义对应动画样式，优先级：projectSetting > transitionName > default
  // https://vuejs.org/guide/built-ins/transition.html
  transitionName?: string;
  // 标签页展开数量限制
  dynamicLevel?: number;
  // ROUTE_MAPPING路由模式下对菜单进行排序，BACK路由模式下菜单顺序由接口顺序控制
  orderNo?: number;
  // 真实路由，配合dynamicLevel一起使用，减少计算开销
  realPath: string;
  // ignoreRoute 为true 则路由仅用于菜单生成，不会在实际的路由表中出现
  ignoreRoute?: boolean;
  // 激活路径
  // el-menu组件使用该字段根据对应路由选中对应项
  currentActive?: string;
  // 图标
  icon: string;
  // 标题
  title: string;
  // // 嵌套frame页面，地址，前提是!component为true，截至2024年4月19日未完成不生效
  // frameSrc?: string;
  // 是否关闭标签，截至2024年4月19日未完成不生效
  // affix?: boolean
  // 面包屑点击是否可以跳转，截至2024年4月19日未完成不生效
  // carryParam?: boolean
  // 是否懒加载，不需要配置，路由拦截器里处理
  loaded?: boolean;
}
/**
 * 菜单接口返回类型
 */
export interface RouteItem {
  path: string;
  // 菜单对应模块
  component: string;
  // 相当与route里的meta字段
  meta: RouteMeta;
  // 菜单名称
  name: string;
  // 子菜单
  children?: RouteItem[];
}

/**
 * @description: 获取menu返回值
 */
export type getMenuListResultModel = RouteItem[];
