<script setup lang="ts">
  import { Directive, ref } from 'vue';
  import '../demobox.scss';
  import ClickOutsideDirective from '/@/directives/clickOutside';

  // 局部自定义指令
  const vLocalClickOutside: Directive = ClickOutsideDirective;
  const textV = ref('ClickV');
  const textA = ref('ClickA');

  function handleClickOutsideV() {
    textV.value = 'ClickV Out Side';
  }

  function innerClickV() {
    textV.value = 'ClickV Inner';
  }
  function handleClickOutsideA() {
    textA.value = 'ClickA Out Side';
  }

  function innerClickA() {
    textA.value = 'ClickA Inner';
  }
</script>

<template>
  <el-card>
    <div v-local-click-outside="handleClickOutsideV">
      <div class="demo-box" @click="innerClickV">
        v-click-outside自定义局部指令-点内外部触发不同事件{{ textV }}
      </div>
    </div>
    <div v-click-outside="handleClickOutsideA">
      <div class="demo-box" @click="innerClickA">
        v-click-outside自定义局部指令-点内外部触发不同事件{{ textA }}
      </div>
    </div>
  </el-card>
</template>
