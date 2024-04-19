<script setup lang="ts">
  import { createAppProviderContext } from './useAppContext';
  import { prefixCls } from '/@/settings/designSetting';

  defineOptions({
    name: 'AppProvider',
    inheritAttrs: false,
  });

  defineProps({
    /**
     * 样式前缀
     */
    preCls: { type: String, default: prefixCls },
  });

  // 注入样式前缀变量
  createAppProviderContext({ prefixCls });
</script>

<template>
  <slot />
</template>
