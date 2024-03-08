import { PropRule } from './typing';

export const propRules: PropRule[] = [
  {
    valField: 'readonlyValue',
    ruleField: ['Array', 'String'],
    msg: '应为数组或字符串格式，已使用defVal数据替换',
    defVal: [],
  },
  {
    valField: 'keyToValList',
    ruleField: ['Array'],
    msg: '应为数组格式，已使用defVal数据替换',
    defVal: [],
  },
];
