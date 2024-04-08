<template>
  <div class="layout-multiple__tabs">
    <el-tabs v-model="activeKeyRef" type="card">
      <el-tab-pane
        :name="item.query ? item.fullPath : item.path"
        v-for="item in getTabsState"
        :key="item.query ? item.fullPath : item.path"
      >
        <template #label>
          <span>{{ getTitle(item) }}</span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
  import { RouteLocationNormalized, RouteMeta } from 'vue-router';
  import { listenerRouteChange } from '/@/logics/mitt/routeChange';
  import { router } from '/@/router';
  import { computed, ref, unref } from 'vue';
  import { useUserStore } from '/@/stores/modules/user';
  import { useMultipleTabStore } from '/@/stores/modules/multipleTab';
  import { useI18n } from '/@/hooks/web/useI18n';

  const userStore = useUserStore();
  const tabStore = useMultipleTabStore();

  const activeKeyRef = ref('');

  const { t } = useI18n();

  listenerRouteChange((route) => {
    if (!route || !userStore.getToken) {
      return;
    }

    const { path, fullPath, meta = {} } = route;
    const { currentActiveMenu, hideTab } = meta as RouteMeta;
    const isHide = !hideTab ? null : currentActiveMenu;
    const p = isHide || fullPath || path;
    if (activeKeyRef.value !== p) {
      activeKeyRef.value = p as string;
    }

    if (isHide) {
      const findParentRoute = router.getRoutes().find((item) => item.path === currentActiveMenu);

      findParentRoute && tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized);
    } else {
      tabStore.addTab(unref(route));
    }

    console.log('选项卡数据', tabStore.getTabList);
  });

  const getTabsState = computed(() => {
    return tabStore.getTabList.filter((item) => !item.meta?.hideTab);
  });

  function getTitle(item: RouteLocationNormalized) {
    return item.meta && t(item.meta.title as string);
  }
</script>

<style lang="scss" scoped>
  .layout-multiple__tabs {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    border-bottom: 1px solid #d9d9d9;
    box-shadow: 0 4px 4px rgb(0 21 41 / 8%);
  }
</style>
