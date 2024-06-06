<script setup lang="ts">
  import { AxiosPromise } from 'axios';
  import { PropType, computed, ref, unref, useAttrs, watch, watchEffect } from 'vue';
  import propTypes from '/@/utils/props';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import { get, isFunction, omit } from 'lodash-es';

  type OptionsItem = {
    label: string;
    value: string | number | boolean;
    disabled?: boolean;
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
    value: {
      type: [String, Number] as PropType<string | number>,
    },
    numberToString: propTypes.bool,
    immediate: propTypes.bool.def(true),
    resultField: propTypes.string.def(''),
    labelField: propTypes.string.def('label'),
    valueField: propTypes.string.def('value'),
  });

  const emit = defineEmits(['options-change', 'change', 'update:value']);

  const attrs = useAttrs();

  const getBindValue = computed(() => {
    return { ...attrs, ...props } as Recordable;
  });

  const optionsItem = ref<OptionsItem[]>([]);

  // // 假设接口返回的数据为这种格式
  // const options2 = ref([
  //   {
  //     name: '启用',
  //     id: 1,
  //   },
  //   {
  //     name: '禁用',
  //     id: 0,
  //   },
  //   // getOptions里的omit函数会处理--begin
  //   {
  //     label: '自定义',
  //     id: 2,
  //   },
  //   // end
  // ]);
  // // 那么props所需参数，labelField需要为name,valueField需要为id

  const emitData = ref<any[]>([]);
  const [state] = useRuleFormItem(props, 'value', 'change', emitData);

  const getOptions = computed((): OptionsItem[] => {
    if (props.options) {
      return getSelectOption(props.options as OptionsItem[]);
    } else {
      return getSelectOption(unref(optionsItem));
    }
  });

  function getSelectOption(item: OptionsItem[]) {
    const { labelField, valueField, numberToString } = props;
    return item.reduce((prev, next) => {
      if (next) {
        const value = next[valueField];
        prev.push({
          label: next[labelField],
          value: numberToString ? `${value}` : value,
          // 补充接口里符合OptionsItem[]数据类型的值
          ...omit(next, [labelField, valueField]),
        });
      }
      return prev;
    }, [] as OptionsItem[]);
  }

  function emitChange() {
    emit('options-change', unref(getOptions));
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

  function handleClick(...args) {
    emitData.value = args;
  }

  watch(
    () => unref(state),
    () => {
      emit('update:value', unref(state));
    },
  );
</script>

<template>
  <el-select v-model="state" v-bind="getBindValue">
    <template v-for="item in getOptions" :key="item.value">
      <el-option
        :disabled="item.disabled"
        :label="item.label"
        :value="item.value"
        @click="handleClick(item)"
      />
    </template>
  </el-select>
</template>
