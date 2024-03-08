import {
  computed,
  getCurrentInstance,
  nextTick,
  reactive,
  ref,
  toRaw,
  unref,
  watchEffect,
} from 'vue';
import { tryOnUnmounted } from '@vueuse/core';
import {
  DialogAction,
  DialogProp,
  ReturnInnerMethods,
  ReturnMethods,
  UseDialogInnerReturnType,
  UseDialogReturnType,
} from './typing';
import { isEqual, isFunction } from 'lodash-es';
import { Fn } from '/#/index';

const dataTransFerRef = reactive({});
const visibleData = reactive<{ [key: number]: boolean }>({});
export function useDialog(): UseDialogReturnType {
  const dialog = ref<Nullable<DialogAction>>(null);
  const uid = ref<string>('');
  function register(dialogAction: DialogAction, uuid: string) {
    tryOnUnmounted(() => {
      dialog.value = null;
      dataTransFerRef[unref(uid)] = null;
    });
    if (dialogAction === unref(dialog)) {
      return;
    }
    uid.value = uuid;
    dialog.value = dialogAction;
    dialogAction.emitVisible = (visible: boolean, uid: number) => {
      visibleData[uid] = visible;
    };
  }

  const getInstance = () => {
    const instance = unref(dialog);
    if (!instance) {
      console.log('dialog实例未创建！');
    }
    return instance;
  };

  const methods: ReturnMethods = {
    setProps: (props: Partial<DialogProp>): void => {
      getInstance()?.setProps(props);
    },
    getVisible: computed((): boolean => {
      return visibleData[~~unref(uid)];
    }),
    openDialog: <T = any>(visible = true, data?: T, openOnSet = true): void => {
      getInstance()?.setProps({
        visible: visible,
        ...data,
      });
      if (!data) return;
      if (openOnSet) {
        dataTransFerRef[unref(uid)] = null;
        dataTransFerRef[unref(uid)] = toRaw(data);
      }
      const equal = isEqual(toRaw(dataTransFerRef[unref(uid)]), toRaw(data));

      if (!equal) {
        dataTransFerRef[unref(uid)] = toRaw(data);
      }
    },
    closeDialog: () => {
      getInstance()?.setProps({ visible: false });
    },
  };

  return [register, methods];
}

export function useDialogInner(callbackFn?: Fn): UseDialogInnerReturnType {
  const dialogInstanceRef = ref<Nullable<DialogAction>>(null);
  const currentInstance = getCurrentInstance();
  const uidRef = ref<string>('');

  if (!getCurrentInstance()) {
    throw new Error('useDialogInner（）只能在setup或component内部使用！');
  }

  const getInstance = () => {
    const instance = unref(dialogInstanceRef);
    if (!instance) {
      console.log('useDrawerInner实例未创建！');
      return;
    }
    return instance;
  };

  const register = (dialogInstance: DialogAction, uuid: string) => {
    tryOnUnmounted(() => {
      dialogInstanceRef.value = null;
    });
    uidRef.value = uuid;
    dialogInstanceRef.value = dialogInstance;
    // 与useDialog建立emit联系
    currentInstance?.emit('register', dialogInstance, uuid);
  };

  watchEffect(() => {
    const data = dataTransFerRef[unref(uidRef)];
    if (!data) return;
    if (!callbackFn || !isFunction(callbackFn)) return;
    nextTick(() => {
      callbackFn(data);
    });
  });

  const methods: ReturnInnerMethods = {
    changeLoading: (loading = true) => {
      getInstance()?.setProps({ loading });
    },
    changeOkLoading: (loading = true) => {
      getInstance()?.setProps({ confirmLoading: loading });
    },
    getVisible: computed((): boolean => {
      return visibleData[~~unref(uidRef)];
    }),
    closeDialog: () => {
      getInstance()?.setProps({ visible: false });
    },
    setProps: (props: Partial<DialogProp>) => {
      getInstance()?.setProps(props);
    },
  };
  return [register, methods];
}
