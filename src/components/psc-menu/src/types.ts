import { MenuModeEnum } from '/@/enums/menuEnum';
import { Menu } from '/@/router/types';

export interface MenuState {
  // 当前选中的菜单项 key 数组
  defaultActive: string;
}

export interface MenuProps {
  // 菜单数据
  menuItems: Menu[];
  // 菜单是否打开手风琴模式
  uniqueOpened: boolean;
  // 菜单模式
  mode: MenuModeEnum;
  // 菜单模式
  collapseTransition: boolean;
  // 菜单宽度，单位：px
  menuWidth: number;
  // 菜单是否折叠
  collapsed: number;
  // 菜单背景颜色
  backgroundColor: string;
  // 菜单文字颜色
  textColor: string;
  // 菜单激活文字颜色
  activeTextColor: string;
  // 菜单点击事件
  onSelect: (e) => void;
}
