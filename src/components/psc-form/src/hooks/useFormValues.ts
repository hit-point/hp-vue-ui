import { ComputedRef, Ref, toRaw, unref } from 'vue';
import { FormActionType, FormSchema } from '../typing';
import { isNullOrUnDef } from '/@/utils/is';
import { cloneDeep } from 'lodash-es';
import { getModelReturnValue } from '../utils';

interface UseFormValuesContext {
  defaultVlaueRef: Ref<any>;
  getSchema: ComputedRef<FormSchema[]>;
  formModel: Recordable;
  formElRef: Ref<FormActionType>;
}

export function useFormValues({
  defaultVlaueRef,
  getSchema,
  formModel,
  formElRef,
}: UseFormValuesContext) {
  function initDefault() {
    const schemas = unref(getSchema);
    const obj: Recordable = {};
    schemas.forEach((item) => {
      const { defaultValue } = item;
      // 有默认值进入
      if (!isNullOrUnDef(defaultValue)) {
        obj[item.field] = defaultValue;
      }
    });
    defaultVlaueRef.value = cloneDeep(obj);
  }

  function setFieldsValue(values: Recordable) {
    const fields = unref(getSchema)
      .map((x) => x.field)
      .filter(Boolean);
    fields.forEach((key) => {
      const value = values[key];
      const hasKey = Reflect.has(values, key);
      if (hasKey) {
        unref(formModel)[key] = value;
      }
    });
  }

  function getFieldsValue() {
    const formEl = unref(formElRef);
    if (!formEl) return {};
    const cloneFormModel = cloneDeep(unref(formModel));
    const schemas = unref(getSchema);
    schemas.forEach((item) => {
      const { field, valueType } = item;
      cloneFormModel[field] = getModelReturnValue({
        value: cloneFormModel[field],
        valueType,
      });
    });

    return toRaw(cloneFormModel);
  }

  return { initDefault, setFieldsValue, getFieldsValue };
}
