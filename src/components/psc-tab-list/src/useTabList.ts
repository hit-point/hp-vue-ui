import { nextTick, onUnmounted, ref, unref, watch } from 'vue';
import { TabListActionType, TabListPropsType, UseTabListReturnType } from './typing';
import { DynamicProps } from '/#/index';
import { isProdMode } from '/@/utils/env';
import { getDynamicProps } from '/@/utils/props';

type Props = Partial<DynamicProps<TabListPropsType>>;

export function useTabList(props?: Props): UseTabListReturnType {
  const tabListRef = ref<Nullable<TabListActionType>>(null);

  async function getTabList() {
    const tabList = unref(tabListRef);
    if (!tabList) {
      console.log('tab栏列表示例尚未获取，请确保在执行列表操作时已呈现列表！');
    }
    await nextTick();
    return tabList as TabListActionType;
  }

  function register(instance: TabListActionType) {
    isProdMode() &&
      onUnmounted(() => {
        tabListRef.value = null;
      });

    if (isProdMode() && instance === unref(tabListRef)) return;

    tabListRef.value = instance;

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

  const method: TabListActionType = {
    setProps: async (props: Partial<TabListPropsType>) => {
      const tabList = await getTabList();
      tabList.setProps(props);
    },
  };

  return [register, method];
}
