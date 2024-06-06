<script setup lang="ts">
  import { RoleEnum } from '/@/enums/roleEnum';
  import { BasicButton } from '../../../components/hp-button';
</script>

<template>
  <el-card>
    <BasicButton v-auth="RoleEnum.SUPER">拥有super角色权限可见</BasicButton>
    <BasicButton v-auth="RoleEnum.TEST">拥有test角色权限可见</BasicButton>
  </el-card>
</template>
