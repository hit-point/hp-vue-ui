<script setup lang="ts">
  import { reactive } from 'vue';
  import { menuProps } from './props';
  import BasicSubMenuItem from './components/BasicSubMenuItem.vue';
  import { MenuState, MenuProps } from './types';
  import { listenerRouteChange } from '/@/logics/mitt/routeChange';

  const props: MenuProps = defineProps(menuProps);

  const menuState = reactive<MenuState>({
    defaultActive: '',
  });

  listenerRouteChange((route) => {
    menuState.defaultActive = route.meta?.currentActive as string;
  });
</script>

<template>
  <el-menu v-bind="props" :default-active="menuState.defaultActive">
    <BasicSubMenuItem v-for="item in props.menuItems" :key="item.path" :menuItem="item" />
  </el-menu>
</template>

<style lang="scss">
  $active-bg-color: #408ede;

  .el-menu {
    border-right: 0;
  }

  .el-sub-menu__title *,
  .el-menu-item * {
    vertical-align: middle;
    opacity: 0.8;
  }

  .el-menu-item.is-active {
    & * {
      opacity: 1;
    }

    &::before {
      position: absolute;
      inset: 0 8px;
      margin: 4px 0;
      clear: both;
      content: '';
      background: $active-bg-color !important;
      border-radius: 3px;
    }
  }
</style>
