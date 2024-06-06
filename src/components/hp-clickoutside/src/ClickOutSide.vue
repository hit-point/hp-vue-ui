<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { onClickOutside } from '@vueuse/core';

  const emit = defineEmits(['clickOutside', 'mounted']);

  const wrap = ref(null);

  onClickOutside(wrap, () => {
    emit('clickOutside');
  });

  onMounted(() => {
    emit('mounted');
  });
</script>

<template>
  <div ref="wrap">
    <slot />
  </div>
</template>
