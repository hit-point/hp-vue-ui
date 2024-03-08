import { isArray, isEmpty, isNumber, isObject, isString } from 'lodash-es';

/**
 * 数据格式转换函数
 */
export function getModelReturnValue<T extends Recordable>({
  value,
  valueType,
}: {
  value: T;
  valueType: string;
}) {
  if (isNumber(value) || isEmpty(valueType)) return value;
  switch (valueType) {
    case 'str':
      if (isString(value)) return value;
      if (isArray(value)) return value.join();
      if (isObject(value)) return JSON.stringify(value);
      break;
    case 'arr':
      if (isArray(value)) return value;
      if (isString(value)) return value.split(',');
      if (isObject(value)) return Object.entries(value);
      break;
    case 'obj':
      if (isObject(value)) return value;
      if (isArray(value)) return Object.fromEntries(value);
      if (isString(value)) return JSON.parse(value);
      break;

    default:
      break;
  }
}
