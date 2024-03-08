import { ComputedRef } from 'vue';

export interface DrawerProp {
  visible: boolean;
  title: string;
  cancelText: string;
  okText: string;
  maxBodyHeight: string;
  placement: string;
  loading: boolean;
  confirmLoading: boolean;
  closeFunc?: () => boolean;
  showFooter: boolean;
  footerHeight: string | number;
  helpMessage: string | string[];
}

export interface DrawerAction {
  setProps: (prop: Partial<DrawerProp>) => void;
  emitVisible?: (visible: boolean, uid: number) => void;
}

export type RegisterFn = (DrawerAction: DrawerAction, uuid?: string) => void;

export interface ReturnMethods extends DrawerAction {
  openDrawer: <T = any>(visible?: boolean, data?: T, openOnSet?: boolean) => void;
  closeDrawer: () => void;
  getVisible?: ComputedRef<boolean>;
}

export interface ReturnInnerMethods extends DrawerAction {
  changeLoading: (loading: boolean) => void;
  changeOkLoading: (loading: boolean) => void;
  getVisible?: ComputedRef<boolean>;
  closeDrawer: () => void;
}

export type UseDrawerReturnType = [RegisterFn, ReturnMethods];

export type UseDrawerInnerReturnType = [RegisterFn, ReturnInnerMethods];
