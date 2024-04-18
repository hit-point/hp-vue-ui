<template>
  <div class="layout-multiple__tabs">
    <el-tabs v-model="activeKeyRef" type="card" @tab-change="handleChange">
      <el-tab-pane :name="getPath(item)" v-for="item in getTabsState" :key="getPath(item)">
        <template #label>
          <div class="scroll-item">
            <span class="tag-title">{{ getTitle(item) }}</span>
            <span class="schedule-active" />
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
  import { RouteLocationNormalized } from 'vue-router';
  import { listenerRouteChange } from '/@/logics/mitt/routeChange';
  import { computed, ref, unref } from 'vue';
  import { useUserStore } from '/@/stores/modules/user';
  import { useMultipleTabStore } from '/@/stores/modules/multipleTab';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useGo } from '/@/hooks/web/usePage';

  const userStore = useUserStore();
  const tabStore = useMultipleTabStore();

  const activeKeyRef = ref('');

  const { t } = useI18n();
  const go = useGo();

  listenerRouteChange((route) => {
    if (!route || !userStore.getToken) {
      return;
    }

    const { path, fullPath } = route;
    const p = fullPath || path;
    if (activeKeyRef.value !== p) {
      activeKeyRef.value = p as string;
    }

    tabStore.addTab(unref(route));
  });

  const getTabsState = computed(() => {
    return tabStore.getTabList.filter((item) => !item.meta?.hideTab);
  });

  function getTitle(item: RouteLocationNormalized) {
    return item.meta && t(item.meta.title as string);
  }

  function getPath(item: RouteLocationNormalized) {
    return item.query ? item.fullPath : item.path;
  }

  function handleChange(activeKey: any) {
    activeKeyRef.value = activeKey;
    go(activeKey, false);
  }
</script>

<style lang="scss" scoped>
  .layout-multiple__tabs {
    background-color: #fff;
    border-bottom: 1px solid #d9d9d9;
    box-shadow: 0 4px 4px rgb(0 21 41 / 8%);
  }

  .is-active {
    position: relative;
    color: #fff;
    box-shadow: 0 0 0.7px #888;

    .scroll-item {
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

      .tag-title {
        color: var(--el-color-primary) !important;
      }
    }
  }

  /* stylelint-disable-next-line no-descending-specificity */
  .tag-title {
    padding: 0 4px;
    color: var(--el-text-color-primary);
    text-decoration: none;
  }

  .is-active .schedule-active {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--el-color-primary);
  }
</style>
