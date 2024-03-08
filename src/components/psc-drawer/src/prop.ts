import { ButtonProps } from 'element-plus/es/components/button';
import { PropType } from 'vue';

export const headerProp = {
  title: {
    type: String as PropType<string>,
    default: '',
  },
  helpMessage: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
};

export const footerProp = {
  confirmLoading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  isShowOkBtn: { type: Boolean, default: true },
  isShowCancelBtn: { type: Boolean, default: true },
  okText: { type: String, default: '提交' },
  okType: { type: String, default: 'primary' },
  cancelText: { type: String, default: '取消' },
  cancelType: { type: String, default: '' },
  showFooter: { type: Boolean, default: false },
  okButtonProps: Object as PropType<ButtonProps>,
  cancelButtonProps: Object as PropType<ButtonProps>,
  footerHeight: {
    type: [String, Number] as PropType<string | number>,
    default: 40,
  },
};

export const drawerProp = {
  visible: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  closeFunc: {
    type: Function as PropType<Fn>,
    default: null,
  },
  maxBodyHeight: {
    type: String as PropType<string>,
    default: '460px',
  },
  placement: {
    type: String as PropType<string>,
    default: 'right',
  },
  // 在ts文件声明useDrawer函数，需要appendToBody: true
  appendToBody: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  ...headerProp,
  ...footerProp,
};
