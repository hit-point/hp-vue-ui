<script setup lang="ts">
  import MenuItemContent from './MenuItemContent.vue';
  import { itemProps } from '../props';

  const props = defineProps(itemProps);
</script>

<template>
  <el-menu-item :index="props.menuItem.path">
    <MenuItemContent :menuItem="props.menuItem" />
  </el-menu-item>
</template>

<style lang="scss">
  .el-menu-item.is-active::before {
    position: absolute;
    inset: 0 8px;
    margin: 4px 0;
    clear: both;
    content: '';
    background: var(--el-color-primary) !important;
    border-radius: 3px;
  }
</style>
