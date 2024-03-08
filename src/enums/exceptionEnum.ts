/**
 * @description: 异常相关枚举
 */
export enum ExceptionEnum {
  // 页面无法访问
  PAGE_NOT_ACCESS = 403,

  // 找不到页面
  PAGE_NOT_FOUND = 404,

  // error
  ERROR = 500,

  // 网络错误
  NET_WORK_ERROR = 10000,

  // 页面上没有数据。事实上，它不是一个例外页面
  PAGE_NOT_DATA = 10100,
}

export enum ErrorTypeEnum {
  VUE = 'vue',
  SCRIPT = 'script',
  RESOURCE = 'resource',
  AJAX = 'ajax',
  PROMISE = 'promise',
}
