<script setup lang="ts">
  import { AxiosPromise } from 'axios';
  import { PropType, computed, ref, unref, useAttrs, watch, watchEffect } from 'vue';
  import propTypes from '/@/utils/props';
  import { get, isFunction, omit, isArray } from 'lodash-es';
  import { isUnDef } from '/@/utils/is';
  import { ElTree } from 'element-plus';
  import Node from 'element-plus/es/components/tree/src/model/node';

  type OptionsItem = {
    id: string;
    label: string;
    children: OptionsItem[];
  };

  const props = defineProps({
    api: {
      type: Function as PropType<(arg?: Recordable | string) => AxiosPromise<any>>,
      default: null,
    },
    params: {
      type: [Object, String] as PropType<Recordable | string>,
      default: () => {},
    },
    options: {
      type: Object as PropType<OptionsItem[]>,
    },
    defaultCheckedKeys: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    numberToString: propTypes.bool,
    immediate: propTypes.bool.def(true),
    resultField: propTypes.string.def(''),
    idField: propTypes.string.def('id'),
    labelField: propTypes.string.def('label'),
    childField: propTypes.string.def('children'),
  });

  const emit = defineEmits(['options-change', 'change', 'update:defaultCheckedKeys']);

  const attrs = useAttrs();

  const treeRef = ref<InstanceType<typeof ElTree>>();

  const getBindValue = computed(() => {
    return { ...attrs, ...props } as Recordable;
  });
  const getDisable = computed(() => {
    const { disabled, showCheckbox } = unref(getBindValue);
    if (isUnDef(showCheckbox)) return !disabled;
    return showCheckbox;
  });

  const optionsItem = ref<OptionsItem[]>([]);

  const getOptions = computed((): OptionsItem[] => {
    if (props.options) {
      return getTreeOption(props.options as OptionsItem[]);
    } else {
      return getTreeOption(unref(optionsItem));
    }
  });

  function getTreeOption(item: OptionsItem[]) {
    const { labelField, idField, childField, numberToString } = props;
    return item.reduce((prev, next) => {
      if (next) {
        const value = next[labelField];
        const child = next[childField];
        prev.push({
          id: next[idField],
          label: numberToString ? `${value}` : value,
          children: isArray(child) ? getTreeOption(child) : [],
          // 补充接口里符合OptionsItem[]数据类型的值
          ...omit(next, [idField, labelField, childField]),
        });
      }
      return prev;
    }, [] as OptionsItem[]);
  }

  function emitChange() {
    emit('options-change', unref(getOptions));
  }

  function checkChange(_data, { checkedKeys }) {
    // Form组件需要
    emit('change', checkedKeys);
    // 单独使用绑定v-model需要
    emit('update:defaultCheckedKeys', checkedKeys);
  }

  async function fetch() {
    const api = props.api;
    if (!api || !isFunction(api)) return;
    optionsItem.value = [];
    try {
      const res = await api(props.params);
      const result = res.data.content;
      // options需要optionItems[]的数据类型
      if (Array.isArray(result)) {
        optionsItem.value = result;
        emitChange();
      }
      if (props.resultField) {
        optionsItem.value = get(result, props.resultField) || [];
      }
      emitChange();
    } catch (error) {
      console.warn(error);
    }
  }

  watchEffect(() => {
    props.immediate && fetch();
  });

  watch(
    () => props.defaultCheckedKeys,
    () => {
      if (!treeRef.value) return;
      const nodes = props.defaultCheckedKeys || [];
      treeRef.value.setCheckedNodes(nodes as unknown as Node[]);
    },
  );
</script>

<template>
  <el-tree
    ref="treeRef"
    :data="getOptions"
    v-bind="getBindValue"
    :show-checkbox="getDisable"
    @check="checkChange"
  />
</template>
