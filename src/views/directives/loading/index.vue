<script setup lang="ts">
  import '../demobox.scss';
  import { ref } from 'vue';
  const loadingV = ref(false);

  function loadingFn() {
    loadingV.value = true;
    setTimeout(() => {
      loadingV.value = false;
    }, 1000);
  }
</script>

<template>
  <el-card>
    <div class="demo-box" v-hp-loading="loadingV" @click="loadingFn">
      <span>v-hp-loading自定义指令-仿antd加载指令</span>
    </div>
  </el-card>
</template>
