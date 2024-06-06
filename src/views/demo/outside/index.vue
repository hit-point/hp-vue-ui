<script setup lang="ts">
  import { ref } from 'vue';
  import '../../directives/demobox.scss';
  import { ClickOutSide } from '../../../components/hp-clickoutside';

  const textC = ref('ClickC');

  function handleClickOutsideC() {
    textC.value = 'ClickC Out Side';
  }

  function innerClickC() {
    textC.value = 'ClickC Inner';
  }
</script>

<template>
  <el-card>
    <ClickOutSide @clickOutside="handleClickOutsideC">
      <div class="demo-box" @click="innerClickC">
        ClickOutSide组件-点内外部触发不同事件{{ textC }}
      </div>
    </ClickOutSide>
  </el-card>
</template>
