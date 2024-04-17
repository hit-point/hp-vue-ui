import { iconType } from './types';
import { h, defineComponent, Component } from 'vue';
import { IconifyIconOnline, IconifyIconOffline } from '../index';

/**
 * 支持 `iconfont`、自定义 `svg` 以及 `iconify` 中所有的图标
 * @param icon 必传 图标
 * @param attrs 可选 iconType 属性
 * @returns Component
 */
export function useRenderIcon(icon: any, attrs?: iconType): Component {
  if (typeof icon === 'function' || typeof icon?.render === 'function') {
    // svg
    return icon;
  } else if (typeof icon === 'object') {
    return defineComponent({
      name: 'OfflineIcon',
      render() {
        return h(IconifyIconOffline, {
          icon: icon,
          ...attrs,
        });
      },
    });
  } else {
    // 通过是否存在 : 符号来判断是在线还是本地图标，存在即是在线图标，反之
    return defineComponent({
      name: 'Icon',
      render() {
        const IconifyIcon = icon && icon.includes(':') ? IconifyIconOnline : IconifyIconOffline;
        return h(IconifyIcon, {
          icon: icon,
          ...attrs,
        });
      },
    });
  }
}
