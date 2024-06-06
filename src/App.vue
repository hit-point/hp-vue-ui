<script setup lang="ts">
  import { computed, unref } from 'vue';
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
  import en from 'element-plus/dist/locale/en.mjs';
  import { AppProvider } from './components/hp-application';
  import { useLocale } from '/@/locales/useLocale';
  import { RouterView } from 'vue-router';
  import { LOCALE } from '/@/settings/localeSetting';
  import 'dayjs/locale/zh-cn';

  defineOptions({
    name: 'App',
  });

  // console.log('1');

  // setTimeout(function () {
  //   console.log('2');
  // }, 0);
  // setTimeout(function () {
  //   console.log('3');
  //   setTimeout(function () {
  //     console.log('4');
  //   });
  //   Promise.resolve().then(function () {
  //     console.log('5');
  //   });
  // }, 200);
  // Promise.resolve()
  //   .then(function () {
  //     console.log('6');
  //   })
  //   .then(function () {
  //     console.log('7');
  //   });
  // Promise.resolve().then(function () {
  //   console.log('8');
  // });
  // console.log('9');

  const { getLocale } = useLocale();

  const locale = computed(() => (unref(getLocale) === LOCALE.ZH_CN ? zhCn : en));
</script>

<template>
  <el-config-provider :locale="locale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </el-config-provider>
</template>
