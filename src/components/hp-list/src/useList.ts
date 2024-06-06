import { nextTick, onUnmounted, ref, unref, watch } from 'vue';
import { ListActionType, ListPropsType, UseListReturnType } from './types';
import { DynamicProps } from '/#/index';
import { isProdMode } from '/@/utils/env';
import { getDynamicProps } from '/@/utils/props';

type Props = Partial<DynamicProps<ListPropsType>>;

export function useList(props?: Props): UseListReturnType {
  const listRef = ref<Nullable<ListActionType>>(null);

  async function getList() {
    const list = unref(listRef);
    if (!list) {
      console.log('list栏列表示例尚未获取，请确保在执行列表操作时已呈现列表！');
    }
    await nextTick();
    return list as ListActionType;
  }

  function register(instance: ListActionType) {
    isProdMode() &&
      onUnmounted(() => {
        listRef.value = null;
      });

    if (isProdMode() && instance === unref(listRef)) return;

    listRef.value = instance;

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

  const method: ListActionType = {
    setProps: async (props: Partial<ListPropsType>) => {
      const list = await getList();
      list.setProps(props);
    },
  };

  return [register, method];
}
