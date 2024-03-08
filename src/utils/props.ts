import { CSSProperties, VNodeChild, unref } from 'vue';
import { VueTypeValidableDef, VueTypesInterface, createTypes, toValidableType } from 'vue-types';

export type VueNode = VNodeChild | JSX.Element;

type PropTypes = VueTypesInterface & {
  readonly style: VueTypeValidableDef<CSSProperties>;
  readonly VNodeChild: VueTypeValidableDef<VueNode>;
};

const newPropTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined,
}) as PropTypes;

export default class propTypes extends newPropTypes {
  static get style() {
    return toValidableType('style', {
      type: [String, Object],
    });
  }

  static get VNodeChild() {
    return toValidableType('VNodeChild', {
      type: undefined,
    });
  }
}

// 动态使用hook参数
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props as Recordable).forEach((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}
