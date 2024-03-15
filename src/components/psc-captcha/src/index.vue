<script setup lang="ts">
  import { watch } from 'vue';
  import { useCaptcha } from './hooks';

  interface Props {
    code?: string;
  }

  interface Emits {
    (e: 'update:code', code: string): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    code: '',
  });

  const emit = defineEmits<Emits>();

  const { domRef, imgCode, setImgCode, getImgCode } = useCaptcha();

  watch(
    () => props.code,
    (newValue) => {
      setImgCode(newValue);
    },
  );
  watch(imgCode, (newValue) => {
    emit('update:code', newValue);
  });

  defineExpose({ getImgCode });
</script>

<template>
  <canvas ref="domRef" width="120" height="30" class="cursor-pointer" @click="getImgCode" />
</template>
