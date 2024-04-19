<script setup lang="ts">
  import { watch } from 'vue';
  import { useCaptcha } from './useCaptcha';

  interface Emits {
    (e: 'update:code', code: string): void;
  }

  const emit = defineEmits<Emits>();

  const { domRef, imgCode, drawImgCode } = useCaptcha();

  watch(imgCode, (newV) => {
    emit('update:code', newV);
  });

  defineExpose({ drawImgCode });
</script>

<template>
  <canvas ref="domRef" width="120" height="30" class="cursor-pointer" @click="drawImgCode" />
</template>
