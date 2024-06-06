import { PropType } from 'vue';
import { Menu } from '/@/router/types';
import { MenuModeEnum } from '/@/enums/menuEnum';
import { SIDE_BAR_BG_COLOR_LIST } from '/@/settings/designSetting';

export const menuProps = {
  // 菜单数据
  menuItems: {
    type: Array as PropType<Menu[]>,
    default: () => [],
  },
  // 菜单是否打开手风琴模式
  uniqueOpened: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  // 菜单是否打开手风琴模式
  collapseTransition: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  // 菜单模式
  mode: {
    type: String as PropType<MenuModeEnum>,
    default: MenuModeEnum.VERTICAL,
  },
  // 菜单宽度，单位：px
  menuWidth: {
    type: Number as PropType<number>,
    default: 210,
  },
  // 菜单是否折叠
  collapsed: {
    type: Number as PropType<number>,
    default: 210,
  },
  // 菜单背景颜色
  backgroundColor: {
    type: String as PropType<string>,
    default: SIDE_BAR_BG_COLOR_LIST[0],
  },
  // 菜单文字颜色
  textColor: {
    type: String as PropType<string>,
    default: SIDE_BAR_BG_COLOR_LIST[1],
  },
  // 菜单激活文字颜色
  activeTextColor: {
    type: String as PropType<string>,
    default: SIDE_BAR_BG_COLOR_LIST[1],
  },
  // 菜单点击事件
  onSelect: {
    type: Function as PropType<(e) => void>,
    default: null,
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
