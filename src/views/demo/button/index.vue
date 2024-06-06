<script setup lang="ts">
  import { computed, reactive, ref, unref } from 'vue';
  import { loginApi } from '/@/api/sys/user';
  import { BasicButton } from '../../../components/hp-button';
  const apiData = ref();
  const loading = ref(false);
  const loginParams = reactive({
    username: 'pasco',
    password: '123456',
  });

  async function login() {
    loading.value = true;
    apiData.value = null;
    const data = await loginApi(loginParams);
    apiData.value = data;
    loading.value = false;
  }

  const btnProps = computed(() => {
    return {
      loading: unref(loading),
      type: 'primary',
      onClick: login,
    };
  });
</script>

<template>
  <el-card>
    <BasicButton v-bind="btnProps">点击按钮加载样式</BasicButton>

    <span>{{ apiData }}</span>
  </el-card>
</template>
