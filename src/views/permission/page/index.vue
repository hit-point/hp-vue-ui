<script setup lang="ts">
  import { useUserStore } from '/@/stores/modules/user';
  import { useAppStoreWithOut } from '/@/stores/modules/app';
  import projectSetting from '/@/settings/projectSetting';
  const userStore = useUserStore();
  const appStore = useAppStoreWithOut();
  const roleList = userStore.getRoleList;

  const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig;
</script>

<template>
  <el-card>
    <p>BACK是由后端根据不同角色返回对应路由</p>
    <p>ROUTE_MAPPING是前端根据route文件夹的module生成固定路由</p>
    <p>如需更改请前往/@/settings/projectSetting文件处更改</p>
    <p>在ROUTE_MAPPING模式下路由结构的roles字段可以控制页面权限</p>
    <p>例如roles: ["super"]代表该路由只能被super角色查看</p>
    <p>路由模式：{{ permissionMode }}</p>
    <p>当前角色：{{ roleList }}</p>
  </el-card>
</template>
