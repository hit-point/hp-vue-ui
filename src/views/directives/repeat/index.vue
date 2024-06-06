<script setup lang="ts">
  import { Directive } from 'vue';
  import RepeatDirective from '/@/directives/repeatClick';
  import { BasicButton } from '../../../components/hp-button';

  // 局部自定义指令
  const vLocalRepeatClick: Directive = RepeatDirective;

  function repeatCLk() {
    console.log('我被全局自定义触发了');
  }
  function localRepeatCLk() {
    console.log('我被局部自定义触发了');
  }
</script>

<template>
  <el-card>
    <BasicButton v-repeat-click="repeatCLk"
      >全局自定义指令-鼠标长点触发点击（防止重复点击）v-repeat-click</BasicButton
    >
    <BasicButton v-Local-repeat-click="localRepeatCLk"
      >局部自定义指令-鼠标长点触发点击（防止重复点击）v-Local-repeat-click</BasicButton
    >
  </el-card>
</template>
