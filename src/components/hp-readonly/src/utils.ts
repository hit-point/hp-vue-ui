import { isEmpty } from 'lodash-es';
import { PropRule, ReadonlyProp } from './typing';

export function commonCheck({ val, ruleBo, msg, defVal }) {
  if (!ruleBo) {
    console.warn(msg);
    return defVal || [];
  }
  return val;
}

export function getFieldValue(valField: string, propRules: PropRule[], props: ReadonlyProp) {
  const valRule = propRules.find((x) => x.valField === valField);
  if (!valRule) return props[valField];
  const valType = Object.prototype.toString.call(props[valRule.valField]);
  const dataTypeBol = valRule.ruleField.find((x) => valType.includes(x));
  return commonCheck({
    val: props[valRule.valField],
    ruleBo: !isEmpty(dataTypeBol),
    msg: `参数${valRule.valField}接收到的类型：${valType}，${valRule.msg}`,
    defVal: valRule.defVal,
  });
}
