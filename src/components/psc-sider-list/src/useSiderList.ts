import { nextTick, onUnmounted, ref, unref, watch } from 'vue';
import { SiderListActionType, SiderListPropsType, UseSiderListReturnType } from './typing';
import { DynamicProps } from '/#/index';
import { isProdMode } from '/@/utils/env';
import { getDynamicProps } from '/@/utils/props';

type Props = Partial<DynamicProps<SiderListPropsType>>;

export function useSiderList(props?: Props): UseSiderListReturnType {
  const siderListRef = ref<Nullable<SiderListActionType>>(null);

  async function getSiderList() {
    const siderList = unref(siderListRef);
    if (!siderList) {
      console.log('侧边栏列表示例尚未获取，请确保在执行列表操作时已呈现列表！');
    }
    await nextTick();
    return siderList as SiderListActionType;
  }

  function register(instance: SiderListActionType) {
    isProdMode() &&
      onUnmounted(() => {
        siderListRef.value = null;
      });

    if (isProdMode() && instance === unref(siderListRef)) return;

    siderListRef.value = instance;

    watch(
      () => props,
      () => {
        props && instance.setProps(getDynamicProps(props));
      },
      {
        immediate: true,
        deep: true,
      },
    );
  }

  const method: SiderListActionType = {
    setProps: async (props: Partial<SiderListPropsType>) => {
      const siderList = await getSiderList();
      siderList.setProps(props);
    },
  };

  return [register, method];
}
