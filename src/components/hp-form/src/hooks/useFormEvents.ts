import { Ref, unref } from 'vue';
import { FormActionType, ValidEnum } from '../typing';
import { EmitType } from '/#/index';

interface UseFormActionContext {
  emit: EmitType;
  formElRef: Ref<FormActionType>;
  getFieldsValue: () => void;
  disabledRef: Recordable<any>;
  hideRef: { isHide: boolean };
}

interface validateType {
  type: ValidEnum;
  result: void;
}

export function useFormEvents({
  emit,
  formElRef,
  getFieldsValue,
  disabledRef,
  hideRef,
}: UseFormActionContext) {
  function validate(): Promise<validateType> {
    return new Promise<validateType>((resolve, reject) => {
      unref(formElRef).validate((valid: boolean, fields: Recordable) => {
        if (valid) {
          const formValue = getFieldsValue();
          resolve({ type: ValidEnum.SUCCESS, result: formValue });
        } else {
          reject({ type: ValidEnum.ERROR, result: fields });
        }
      });
    });
  }

  async function validateField(field: string): Promise<void> {
    if (!formElRef) return;
    unref(formElRef).validateField(field);
  }

  async function handleSave(e?: Event): Promise<void> {
    e && e.preventDefault();
    if (!formElRef) return;
    try {
      const { result } = await validate();
      emit('save', { type: ValidEnum.SUCCESS, result: result });
    } catch (err) {
      emit('save', { type: ValidEnum.ERROR, result: err });
    }
  }

  async function resetFields(): Promise<void> {
    if (!formElRef) return;
    unref(formElRef).resetFields();
  }

  function setDisable(bol: boolean) {
    disabledRef.disabled = bol;
  }

  function setShowHide(bol: boolean) {
    hideRef.isHide = bol;
  }

  return {
    handleSave,
    resetFields,
    validate,
    validateField,
    setDisable,
    setShowHide,
  };
}
