<script setup lang="ts">
  import MenuItemContent from './MenuItemContent.vue';
  import { itemProps } from '../props';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { unref } from 'vue';

  const props = defineProps(itemProps);

  const { getMenuActiveBgColor } = useMenuSetting();

  const activeBgColor = unref(getMenuActiveBgColor);
</script>

<template>
  <el-menu-item :index="props.menuItem.path">
    <MenuItemContent :menuItem="props.menuItem" />
  </el-menu-item>
</template>

<style lang="scss">
  $active-bg-color: v-bind('activeBgColor');
</style>
