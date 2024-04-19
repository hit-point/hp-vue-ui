<script lang="tsx">
  import { defineComponent, Transition, createVNode, unref, KeepAlive, computed } from 'vue';
  import { RouterView } from 'vue-router';
  import { TransitionContext, getTransitionName } from './transition';
  import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useMultipleTabStore } from '/@/stores/modules/multipleTab';

  export default defineComponent({
    name: 'PageLayout',
    setup() {
      const { prefixCls } = useDesign('layout-main');
      const { getBasicTransition, getEnableTransition } = useTransitionSetting();
      const tabStore = useMultipleTabStore();

      const { getOpenKeepAlive } = useRootSetting();

      const openCache = computed(() => unref(getOpenKeepAlive));

      const getCaches = computed((): string[] => {
        if (!unref(getOpenKeepAlive)) {
          return [];
        }
        return tabStore.getCachedTabList;
      });

      function renderComponent({ Component, route }: TransitionContext) {
        return (
          <>
            {unref(openCache) ? (
              <KeepAlive key={route.fullPath}>{createVNode(Component)}</KeepAlive>
            ) : (
              <template key={route.fullPath}>{createVNode(Component)}</template>
            )}
          </>
        );
      }

      const routerViewSlot = {
        default: ({ Component, route }: TransitionContext) => {
          return (
            <Transition
              name={getTransitionName({
                route,
                openCache: unref(openCache),
                cacheTabs: unref(getCaches),
                enableTransition: unref(getEnableTransition),
                def: unref(getBasicTransition),
              })}
              mode="out-in"
            >
              {renderComponent({ Component, route })}
            </Transition>
          );
        },
      };
      return () => (
        <el-main class={prefixCls}>
          <RouterView v-slots={routerViewSlot} />
        </el-main>
      );
    },
  });
</script>

<style lang="scss">
  $prefix-cls: '#{$namespace}-layout-main';

  .#{$prefix-cls} {
    width: 100%;
    height: 100%;
  }
</style>
