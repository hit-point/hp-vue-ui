import { nextTick, onUnmounted, ref, unref, watch } from 'vue';
import { FormActionType, FormProps, UseFormReturnType } from '../typing';
import { DynamicProps } from '/#/index';
import { isProdMode } from '/@/utils/env';
import { getDynamicProps } from '/@/utils/props';

type Props = Partial<DynamicProps<FormProps>>;

export function useForm(props?: Props): UseFormReturnType {
  const formRef = ref<Nullable<FormActionType>>(null);
  const loadeRef = ref<Nullable<boolean>>(false);

  async function getForm() {
    const form = unref(formRef);
    if (!form) {
      console.log('表单示例尚未获取，请确保在执行表单操作时已呈现表单！');
    }
    await nextTick();
    return form as FormActionType;
  }

  function register(instance: FormActionType) {
    isProdMode() &&
      onUnmounted(() => {
        formRef.value = null;
        loadeRef.value = null;
      });
    if (unref(loadeRef) && isProdMode() && instance === unref(formRef)) return;

    formRef.value = instance;
    loadeRef.value = true;

    watch(
      () => props,
      () => {
        props && instance.setProps(getDynamicProps(props));
      },
      {
        immediate: true,
        deep: true,
      },
    );
  }
  const method: FormActionType = {
    setProps: async (props: Partial<FormProps>) => {
      const form = await getForm();
      form.setProps(props);
    },
    save: async () => {
      const form = await getForm();
      form.save();
    },
    validate: async () => {
      const form = await getForm();
      return form.validate();
    },
    resetFields: async () => {
      const form = await getForm();
      form.resetFields();
    },
    validateField: async (field) => {
      const form = await getForm();
      form.validateField(field);
    },
    setDisable: async (bol: boolean) => {
      const form = await getForm();
      form.setDisable(bol);
    },
    setShowHide: async (bol: boolean) => {
      const form = await getForm();
      form.setShowHide(bol);
    },
    setFormModel: async (key: string, value: any) => {
      const form = await getForm();
      form.setFormModel(key, value);
    },
    setFieldsValue: async (values: any) => {
      const form = await getForm();
      form.setFieldsValue(values);
    },
    getFieldsValue: <T>() => {
      return unref(formRef)?.getFieldsValue() as T;
    },
  };

  return [register, method];
}
