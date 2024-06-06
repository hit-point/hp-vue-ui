import { PropType } from 'vue';
import { KeyToValType } from './typing';

export const txtProps = {
  truncated: { type: Boolean, default: true },
};

export const fileListProps = {
  keyToValList: {
    type: Array as PropType<KeyToValType[]>,
    default: () => [],
  },
  isDelete: {
    type: Boolean,
    default: true,
  },
};

export const readonlyProps = {
  textVal: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  isFileDelete: {
    type: Boolean,
    defult: false,
  },
  ...txtProps,
  ...fileListProps,
};
