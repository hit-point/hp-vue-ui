<script setup lang="ts">
  import { PropType } from 'vue';
  import { FormProps } from '../typing';
  import { useFOrmContext } from '../hooks/useFormContext';

  const props = defineProps({
    formProps: {
      type: Object as PropType<FormProps>,
      default: () => {},
    },
  });

  const { saveAction, resetAction } = useFOrmContext();
</script>

<template>
  <el-col :span="24" v-show="props.formProps.showActionBUttonGroup">
    <div class="text-right">
      <slot name="resetBefore" />
      <el-button type="default" class="m-2" @click="resetAction">重置</el-button>
      <slot name="submitBefore" />
      <el-button type="default" class="m-2" @click="saveAction">查询</el-button>
    </div>
  </el-col>
</template>
