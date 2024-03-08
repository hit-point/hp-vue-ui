import { PropType } from 'vue';
import { Menu } from '/@/router/types';

export const basicProps = {
  menuItems: {
    type: Array as PropType<Menu[]>,
    default: () => [],
  },
};

export const itemProps = {
  menuItem: {
    type: Object as PropType<Menu>,
    default: () => {},
  },
};

export const contentProps = {
  menuItem: {
    type: Object as PropType<Menu>,
    default: () => {},
  },
};
