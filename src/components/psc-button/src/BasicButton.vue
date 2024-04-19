<script setup lang="ts">
  import { computed, unref, useAttrs } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';

  const attrs = useAttrs();

  // 样式前缀————xxx-layout-menu
  const { prefixCls } = useDesign('button');

  const getBindValue = computed(() => ({ ...unref(attrs) }));
</script>

<template>
  <el-button v-bind="getBindValue">
    <template #loading>
      <svg :class="`${prefixCls}-loading__circular`" viewBox="-10, -10, 50, 50">
        <path
          :class="`${prefixCls}-path`"
          d="M 30 15 L 28 17 M 25.61 25.61 A 15 15, 0, 0, 1, 15 30 A 15 15, 0, 1, 1, 27.99 7.5 L 15 15"
        />
      </svg>
    </template>
    <slot />
  </el-button>
</template>

<style lang="scss" scoped>
  $prefix-cls: '#{$namespace}-button';

  .el-button .#{$prefix-cls}-loading__circular {
    width: 18px;
    height: 18px;
    margin-right: 6px;
    animation: loading-rotate 1s linear infinite;
  }

  .#{$prefix-cls}-path {
    fill: rgb(0 0 0 / 0%);
    stroke-width: 4px;
    stroke: var(--el-button-text-color);
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: loading-dash 0.75s ease-in-out infoinite;
  }
</style>
