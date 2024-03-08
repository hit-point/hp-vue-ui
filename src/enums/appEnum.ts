// 菜单主题
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum SessionTimeoutProcessingEnum {
  ROUTE_JUMP,
  PAGE_COVERAGE,
}

/**
 * 权限模式
 */
export enum PermissionModeEnum {
  // 角色权限
  ROLE = 'ROLE',
  // 后端
  BACK = 'BACK',
  // 路由映射
  ROUTE_MAPPING = 'ROUTE_MAPPING',
}

// 路由切换动画
export enum RouterTransitionEnum {
  FADE = 'fade',
  FADE_TRANSFORM = 'fade-transform',
  BREADCRUMB = 'breadcrumb',
}
