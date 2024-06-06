<script setup lang="ts">
  import { computed, useAttrs, watch, unref, ref, watchEffect, PropType } from 'vue';
  import { BasicPassWord } from '/@/components/hp-password';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';

  const props = defineProps({
    modelValue: {
      type: [String] as PropType<string>,
    },
  });

  const emit = defineEmits(['change', 'update:modelValue']);

  const passWordStrengthRef = ref();

  const attrs = useAttrs();

  const getBindValue = computed(() => {
    return { ...attrs, ...props } as Recordable;
  });

  const [state] = useRuleFormItem(props, 'modelValue', 'change');

  watchEffect(() => {
    if (unref(passWordStrengthRef) && unref(state)) {
      unref(passWordStrengthRef).setModeStatus(unref(state));
    }
  });

  watch(
    () => unref(state),
    (v) => {
      emit('update:modelValue', v);
    },
  );
</script>

<template>
  <el-input autocomplete="off" v-model="state" show-password v-bind="getBindValue" />
  <BasicPassWord ref="passWordStrengthRef" v-show="state" :password="state" />
</template>
