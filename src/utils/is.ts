const toString = Object.prototype.toString;
import {} from 'lodash-es';
export function isType(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined';
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}

export function isObj(val: any): val is Record<any, any> {
  return val !== null && isType(val, 'Object');
}

export function isBlank<T = unknown>(val: T): val is T {
  if (isArr(val) || isStr(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObj(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}

export function isTime(val: unknown): val is Date {
  return isType(val, 'Date');
}

export function hasNull(val: unknown): val is null {
  return val === null;
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && hasNull(val);
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || hasNull(val);
}

export function isNum(val: unknown): val is number {
  return isType(val, 'Number');
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isType(val, 'Promise') && isObj(val) && isFn(val.then) && isFn(val.catch);
}

export function isStr(val: unknown): val is string {
  return isType(val, 'String');
}

export function isFn(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isBol(val: unknown): val is boolean {
  return isType(val, 'Boolean');
}
export function isRegEx(val: unknown): val is RegExp {
  return isType(val, 'RegExp');
}

export function isArr(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && isType(val, 'Window');
}

export function isEle(val: unknown): val is Element {
  return isObj(val) && !!val.tagName;
}

export function hasMap(val: unknown): val is Map<any, any> {
  return isType(val, 'Map');
}

export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

export function isUrl(path: string): boolean {
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  return reg.test(path);
}
