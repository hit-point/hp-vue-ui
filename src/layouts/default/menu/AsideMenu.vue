<script setup lang="ts">
  import { computed, unref } from 'vue';
  import { useMenu } from './useLayoutMenu';
  import { BasicMenu } from '/@/components/psc-menu';
  import { useGo } from '/@/hooks/web/usePage';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { BasicReadonly } from '/@/components/psc-readonly';

  // 路由跳转函数
  const go = useGo();

  // 模块样式前缀————pasco-layout-menu
  const { prefixCls } = useDesign('layout-menu');

  // 侧边栏配置
  const {
    getUniqueOpened,
    getMenuMode,
    getCollapsed,
    getMenuBgColor,
    getMenuTextColor,
    getMenuActiveTextColor,
    getMenuCollapseTransition,
  } = useMenuSetting();

  // 侧边栏数据
  const { menusRef } = useMenu();

  // 侧边栏入参
  const getMenuProps = computed(() => {
    // 取出侧边栏数据
    const menus = unref(menusRef);
    // 参数注释见/@/settings/projectSetting.ts文件
    // 如需添加删除参考https://element-plus.org/zh-CN/component/menu.html#menu-%E8%8F%9C%E5%8D%95
    return {
      menuItems: menus,
      uniqueOpened: unref(getUniqueOpened),
      mode: unref(getMenuMode),
      collapse: unref(getCollapsed),
      backgroundColor: unref(getMenuBgColor),
      textColor: unref(getMenuTextColor),
      activeTextColor: unref(getMenuActiveTextColor),
      collapseTransition: unref(getMenuCollapseTransition),
      onSelect: handleMenuClick,
    };
  });

  // 侧边栏点击事件
  function handleMenuClick(path: string) {
    go(path);
  }
</script>

<template>
  <el-scrollbar width="100%">
    <div :class="`${prefixCls}-logo`">
      <img src="/resource/img/logo.svg" />
      <BasicReadonly
        v-if="!getCollapsed"
        :style="{ color: unref(getMenuProps).textColor }"
        :class="`${prefixCls}-title`"
        textVal="Pasco Admin"
      />
    </div>
    <BasicMenu v-bind="getMenuProps" />
  </el-scrollbar>
</template>

<style lang="scss">
  $prefix-cls: '#{$namespace}-layout-menu';

  .#{$prefix-cls} {
    &-logo {
      display: flex;
      align-items: center;
      cursor: pointer;
      height: 28px;
      padding: 10px 4px 10px 16px;

      img {
        width: 32px;
        height: 32px;
      }
    }

    &-title {
      font-size: 16px;
      font-weight: 700;
      line-height: normal;
      margin-left: 0.5rem;
    }
  }
</style>
