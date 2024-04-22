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
  DrawerAction,
  DrawerProp,
  ReturnInnerMethods,
  ReturnMethods,
  UseDrawerInnerReturnType,
  UseDrawerReturnType,
} from './typing';
import { isEqual, isFunction } from 'lodash-es';
import { Fn } from '/#/index';

const dataTransFerRef = reactive({});
const visibleData = reactive<{ [key: number]: boolean }>({});
export function useDrawer(): UseDrawerReturnType {
  const drawer = ref<Nullable<DrawerAction>>(null);
  const uid = ref<string>('');
  function register(drawerAction: DrawerAction, uuid: string) {
    tryOnUnmounted(() => {
      drawer.value = null;
      dataTransFerRef[unref(uid)] = null;
    });
    if (drawerAction === unref(drawer)) {
      return;
    }
    uid.value = uuid;
    drawer.value = drawerAction;
    drawerAction.emitVisible = (visible: boolean, uid: number) => {
      visibleData[uid] = visible;
    };
  }

  const getInstance = () => {
    const instance = unref(drawer);
    if (!instance) {
      console.log('drawer实例未创建！');
    }
    return instance;
  };

  const methods: ReturnMethods = {
    setProps: (props: Partial<DrawerProp>): void => {
      getInstance()?.setProps(props);
    },
    getVisible: computed((): boolean => {
      return visibleData[~~unref(uid)];
    }),
    openDrawer: <T = any>(visible = true, data?: T, openOnSet = true): void => {
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
    closeDrawer: () => {
      getInstance()?.setProps({ visible: false });
    },
  };

  return [register, methods];
}

export function useDrawerInner(callbackFn?: Fn): UseDrawerInnerReturnType {
  const drawerInstanceRef = ref<Nullable<DrawerAction>>(null);
  const currentInstance = getCurrentInstance();
  const uidRef = ref<string>('');

  if (!getCurrentInstance()) {
    throw new Error('useDrawerInner（）只能在setup或component内部使用！');
  }

  const getInstance = () => {
    const instance = unref(drawerInstanceRef);
    if (!instance) {
      console.log('useDrawerInner实例未创建！');
      return;
    }
    return instance;
  };

  const register = (drawerInstance: DrawerAction, uuid: string) => {
    tryOnUnmounted(() => {
      drawerInstanceRef.value = null;
    });
    uidRef.value = uuid;
    drawerInstanceRef.value = drawerInstance;
    // 与useDrawer建立emit联系
    currentInstance?.emit('register', drawerInstance, uuid);
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
    closeDrawer: () => {
      getInstance()?.setProps({ visible: false });
    },
    setProps: (props: Partial<DrawerProp>) => {
      getInstance()?.setProps(props);
    },
  };
  return [register, methods];
}
