<script setup lang="ts">
  import { ref, watch } from 'vue';

  const props = defineProps({
    password: {
      type: [String, Boolean, Number, Object],
      required: true,
      default: '',
    },
  });

  const color = ref('');
  const onePercentage = ref(0);
  const twoPercentage = ref(0);
  const threePercentage = ref(0);

  function checkPassWordStrength(val) {
    const mode = ref(0);
    if (val.length <= 1) return 1;
    if (/\d/.test(val)) return mode.value++; // 数字
    if (/[a-z]/.test(val)) return mode.value++; // 小写
    if (/[A-Z]/.test(val)) return mode.value++; // 大写
    if (/\W/.test(val)) return mode.value++; // 特殊字符
    return mode.value;
  }

  function setModeStatus(newVal) {
    const mode = checkPassWordStrength(newVal);
    switch (mode) {
      case 0:
        color.value = '#f56c6c';
        onePercentage.value = 0;
        twoPercentage.value = 0;
        threePercentage.value = 0;
        break;
      case 1:
        color.value = '#f56c6c';
        onePercentage.value = 100;
        twoPercentage.value = 0;
        threePercentage.value = 0;
        break;
      case 2:
        color.value = '#e6a23c';
        onePercentage.value = 100;
        twoPercentage.value = 100;
        threePercentage.value = 0;
        break;
      case 3:
        color.value = '#67c23a';
        onePercentage.value = 100;
        twoPercentage.value = 100;
        threePercentage.value = 100;
        break;

      default:
        color.value = '#67c23a';
        onePercentage.value = 100;
        twoPercentage.value = 100;
        threePercentage.value = 100;
        break;
    }
  }

  watch(
    () => props.password,
    (newVal) => {
      if (newVal) setModeStatus(newVal);
    },
    {
      deep: true,
    },
  );

  defineExpose({
    setModeStatus,
  });
</script>

<template>
  <el-row class="items-center m-2 w-[calc(100%)]">
    <el-col :span="8">
      <el-progress :percentage="onePercentage" :color="color" :format="() => String" />
    </el-col>
    <el-col :span="8">
      <el-progress :percentage="twoPercentage" :color="color" :format="() => String" />
    </el-col>
    <el-col :span="8">
      <el-progress :percentage="threePercentage" :color="color" :format="() => String" />
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
  .el-progress__text {
    min-width: 0 !important;
  }
</style>
