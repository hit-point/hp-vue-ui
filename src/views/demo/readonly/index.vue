<script setup lang="ts">
  import { BasicReadonly } from '../../../components/hp-readonly';

  const valProps = {
    textVal: 'lihu,wanghua',
    keyToValList: [
      {
        id: '1',
        key: 'lishen',
        value: '李申1',
      },
      {
        id: '2',
        key: 'wanghua',
        value: '王华2',
      },
      {
        id: '3',
        key: 'lihu',
        value:
          '过长文字显示省略号并出现气泡框过长文字显示省略号并出现气泡框过长文字显示省略号并出现气泡框',
      },
    ],
  };
  const fileProps = {
    keyToValList: [
      {
        fileName: '接口下载文件',
        fileAddr: '/addr',
        fileId: '123',
      },
      {
        name: '本地下载文件',
        uid: '321',
      },
      {
        name: '过长文字显示省略号并出现气泡框过长文字显示省略号并出现气泡框过长文字显示省略号并出现气泡框',
        uid: '321',
      },
    ],
  };
</script>

<template>
  <el-card>
    <BasicReadonly v-bind="valProps" />
    <BasicReadonly v-bind="fileProps" />
  </el-card>
</template>
