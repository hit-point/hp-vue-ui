import { PropType } from 'vue';
import { FormSchema } from './typing';
import propTypes from '/@/utils/props';

export const basicFormProps = {
  schemas: {
    type: Array as PropType<FormSchema[]>,
    default: () => [],
  },
  model: {
    type: Object as PropType<Recordable>,
    default: () => {},
  },
  size: propTypes.oneOf(['default', 'small', 'large']).def('default'),
  borderColor: propTypes.oneOf(['#777']).def('#777'),
  boder: {
    type: Boolean,
    default: false,
  },
};
