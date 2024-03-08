import { ComputedRef } from 'vue';

export interface DialogProp {
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

export interface DialogAction {
  setProps: (prop: Partial<DialogProp>) => void;
  emitVisible?: (visible: boolean, uid: number) => void;
}

export type RegisterFn = (DialogAction: DialogAction, uuid?: string) => void;

export interface ReturnMethods extends DialogAction {
  openDialog: <T = any>(visible?: boolean, data?: T, openOnSet?: boolean) => void;
  closeDialog: () => void;
  getVisible?: ComputedRef<boolean>;
}

export interface ReturnInnerMethods extends DialogAction {
  changeLoading: (loading: boolean) => void;
  changeOkLoading: (loading: boolean) => void;
  getVisible?: ComputedRef<boolean>;
  closeDialog: () => void;
}

export type UseDialogReturnType = [RegisterFn, ReturnMethods];

export type UseDialogInnerReturnType = [RegisterFn, ReturnInnerMethods];
