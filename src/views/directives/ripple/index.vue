<script setup lang="ts">
  import { Directive } from 'vue';
  import '../demobox.scss';
  import RippleDirective from '/@/directives/ripple';

  // 局部自定义指令
  const vLocalRipple: Directive = RippleDirective;
</script>

<template>
  <el-card>
    <div class="mb-1 demo-box" v-local-ripple> 局部指令-水波纹 v-local-ripple </div>
    <div class="demo-box" v-ripple> 全局指令-水波纹 v-ripple </div>
  </el-card>
</template>
