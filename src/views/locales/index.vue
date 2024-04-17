<script setup lang="ts">
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();
</script>

<template>
  <el-card> 国际化：{{ t('menus.home') }} </el-card>
</template>
