<script setup lang="ts">
  import { onMounted } from 'vue';
  import { BasicList, useList } from '/@/components/psc-list';
  import { getListInfo } from '/@/api/list';

  const listProps = {
    listTabs: [
      {
        label: '我的',
        name: '1',
      },
      {
        label: '其他',
        name: '2',
      },
      {
        label: '历史',
        name: '3',
      },
    ],
    activeName: '2',
    bomBtnTxt: '新建xxx',
  };

  const getList = async () => {
    setListProps({
      list: [],
      loading: true,
      isDisable: true,
    });
    const res = await getListInfo();
    setListProps({
      list: res.content,
      total: res.total,
      loading: false,
      isDisable: false,
    });
  };

  const [ListRegister, { setProps: setListProps }] = useList(listProps);

  onMounted(() => {
    getList();
  });
</script>

<template>
  <el-row :gutter="24">
    <el-col :span="6">
      <BasicList @register="ListRegister" />
    </el-col>
  </el-row>
</template>
