<script setup lang="ts">
  import { reactive, ref, useAttrs, computed, unref, Ref, watch, onMounted } from 'vue';
  import { basicFormProps } from './props';
  import { FormActionType, FormProps, FormSchema } from './typing';
  import { cloneDeep } from 'lodash-es';
  import FormItem from './components/FormItem.vue';
  import FormAction from './components/FormAction.vue';
  import { deepMerge } from '/@/utils';
  import { useFormValues } from './hooks/useFormValues';
  import { useFormEvents } from './hooks/useFormEvents';
  import { createFormContext } from './hooks/useFormContext';
  import { getModelReturnValue } from './utils';

  const props = defineProps(basicFormProps);
  const emit = defineEmits(['register', 'field-value-change', 'save']);
  const attrs = useAttrs();

  const formModel = reactive({});
  const defaultVlaueRef = ref({});
  const schemaRef = ref<Nullable<FormSchema[]>>(null);
  const propsRef = ref<Partial<FormProps>>();
  const disabledRef = reactive({ disabled: false });
  const hideRef = reactive({ isHide: true });
  const formElRef = ref();

  const getProps = computed((): FormProps => {
    return { ...props, ...unref(propsRef) } as FormProps;
  });

  const getSchema = computed((): FormSchema[] => {
    const schemas: FormSchema[] = unref(schemaRef) || unref(getProps).schemas;
    return cloneDeep(schemas as FormSchema[]);
  });

  const getDisabled = computed((): boolean => {
    return unref(getProps).disabled || disabledRef.disabled;
  });

  const getClass = computed(() => {
    const { border } = unref(getProps);
    return {
      'basic-form': border,
    };
  });

  async function setProps(props: Partial<FormProps>) {
    propsRef.value = deepMerge(unref(propsRef) || {}, props);
  }

  const getBindValue = computed((): Recordable => {
    return { ...attrs, ...props, ...unref(getProps) };
  });

  const { initDefault, setFieldsValue, getFieldsValue } = useFormValues({
    defaultVlaueRef,
    getSchema,
    formModel,
    formElRef,
  });

  const { handleSave, resetFields, validate, validateField, setDisable, setShowHide } =
    useFormEvents({
      emit,
      formElRef: formElRef as Ref<FormActionType>,
      getFieldsValue,
      disabledRef,
      hideRef,
    });

  createFormContext({
    resetAction: resetFields,
    saveAction: handleSave,
  });

  function setFormModel(key: string, value: any, valueType: string) {
    formModel[key] = value;
    validateField(key);
    emit('field-value-change', key, getModelReturnValue({ value, valueType }));
  }

  watch(
    () => unref(getSchema),
    (schema) => {
      if (schema?.length) initDefault();
    },
    {
      deep: true,
    },
  );

  watch(
    () => unref(getProps).model,
    () => {
      const { model } = unref(getProps);
      if (!model) return;
      setFieldsValue(model);
    },
  );

  const formAction: Partial<FormActionType> = {
    setProps,
    save: handleSave,
    validate,
    validateField,
    resetFields,
    setFormModel,
    setFieldsValue,
    setDisable,
    setShowHide,
  };

  onMounted(() => {
    initDefault();
    emit('register', formAction);
  });
</script>

<template>
  <el-form v-bind="getBindValue" :model="formModel" ref="formElRef" :class="getClass">
    <el-row>
      <template v-for="schema in getSchema" :key="schema.field">
        <FormItem
          :schema="schema"
          :form-props="getProps"
          :form-model="formModel"
          :set-form-model="setFormModel"
          :validate-field="validateField"
          :all-default-values="defaultVlaueRef"
          :disabled="getDisabled"
          :hide-ref="hideRef"
        >
          <template #[item]="data" v-for="item in Object.keys($slots)">
            <slot :name="item" v-bind="data || {}" />
          </template>
        </FormItem>
      </template>
      <FormAction :form-props="getProps">
        <template #[item]="data" v-for="item in ['resetBefore', 'submitBefore']">
          <slot :name="item" v-bind="data || {}" />
        </template>
      </FormAction>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped>
  .basic-form {
    border-left: 1px solid v-bind('borderColor');
    border-top: 1px solid v-bind('borderColor');
    margin: 8px;

    .el-col {
      border-bottom: 1px solid v-bind('borderColor');
      border-right: 1px solid v-bind('borderColor');
    }

    .el-form-item--default {
      margin-bottom: 0;
      height: 100%;
    }

    .el-form-item--default .el-form-item__label {
      height: 100%;
      align-items: center;
      padding: 8px;
      background-color: #e7f3fc;
    }

    .el-form-item--default .el-form-item__content {
      border-left: 1px solid v-bind('borderColor');
      padding: 8px;
    }

    .el-form-item--default .el-form-item__error {
      top: 64%;
      left: 8px;
    }
  }
</style>
