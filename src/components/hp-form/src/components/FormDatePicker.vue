<!-- date-picker只能使用v-model的形式进行绑定 -->
<script setup lang="ts">
  import { PropType, computed, unref, useAttrs, watch } from 'vue';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import { ModelValueType } from 'element-plus';

  const props = defineProps({
    modelValue: {
      type: [String, Number, Date] as PropType<ModelValueType>,
    },
    valueFormat: {
      type: [String] as PropType<string>,
      default: 'YYYY-MM-DD',
    },
  });

  const emit = defineEmits(['change', 'update:value']);

  const attrs = useAttrs();

  const getBindValue = computed(() => {
    return { ...attrs, ...props } as Recordable;
  });

  const [state] = useRuleFormItem(props, 'modelValue', 'change');

  watch(
    () => unref(state),
    () => {
      emit('update:value', unref(state));
    },
  );
</script>

<template>
  <el-date-picker v-model="state" v-bind="getBindValue" />
</template>
