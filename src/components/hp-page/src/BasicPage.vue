<script setup lang="ts">
  import { omit } from 'lodash-es';
  import { ElNotification as notify } from 'element-plus';
  import { computed, useSlots } from 'vue';

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    hideLeft: {
      type: Boolean,
      default: true,
    },
    isShowCard: {
      type: Boolean,
      default: true,
    },
  });

  const slots = useSlots();

  const getHeaderSlots = computed(() => {
    return Object.keys(omit(slots, 'default', 'content', 'headerContent'));
  });

  const getShowHeaderLeft = computed(() => props.hideLeft);

  function onBack() {
    notify('Back');
  }
</script>

<template>
  <div>
    <el-card class="main-content__dis" v-if="isShowCard">
      <template #header>
        <div :class="{ 'header-left__hide': getShowHeaderLeft }">
          <el-page-header v-bind="omit($attrs, 'class')" @back="onBack">
            <template #content>
              <div v-if="title || content">
                <div class="text-xl font-semibold"> {{ title }}</div>
                <div class="text-xs font-normal">
                  {{ content }}
                </div>
              </div>
              <slot name="headerContent" v-else />
            </template>
          </el-page-header>
        </div>
      </template>
      <template #[item]="data" v-for="item in getHeaderSlots">
        <slot :name="item" v-bind="data || {}" />
      </template>
    </el-card>
    <template v-else><slot /></template>
  </div>
</template>

<style lang="scss" scoped>
  .main-content__dis {
    overflow: visible;

    .hearder-left__hide {
      :deep(.el-page-header__left) {
        .el-page-header__back,
        .el-divider {
          display: none;
        }
      }
    }
  }
</style>
