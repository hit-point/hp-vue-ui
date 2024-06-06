import { Fn } from '/#/index';

export interface ColEx {
  span?: number | string;
}

export enum ValidEnum {
  SUCCESS = 'sucess',
  ERROR = 'error',
}

export enum FormItemEnum {
  INPUT = 'Input',
  INPUTNUMBER = 'InputNumber',
  RATE = 'Rate',
  DATEPICKER = 'DatePicker',
  SELECT = 'Select',
  APISELECT = 'ApiSelect',
  APIRADIOGROUP = 'ApiRadioGroup',
}

export type ComponentType =
  | 'Input'
  | 'InputNumber'
  | 'Rate'
  | 'DatePicker'
  | 'Select'
  | 'ApiSelect'
  | 'ApiRadioGroup'
  | 'ApiCheckBoxGroup'
  | 'Txt'
  | 'StrengthMeter'
  | 'ApiTree';

export interface FormSchema {
  field: string;
  label: string;
  isHide?: boolean;
  valueField?: string;
  valueType: 'str' | 'arr' | 'obj';
  changeEvent?: string;
  component: ComponentType;
  componentProps?: (opt) => Recordable | object;
  defaultValue?: any;
  colProps?: Partial<ColEx>;
  colSlot?: string;
  schemas?: FormSchema[];
  required?: boolean;
}

export interface FormProps {
  model?: Recordable;
  labelWidth?: string;
  statusIcon?: boolean;
  showActionBUttonGroup?: boolean;
  disabled?: boolean;
  componentProps?: (opt) => Recordable | object;
  rules?: any;
  saveOnChange?: boolean;
  colProps?: Partial<ColEx>;
  schemas: FormSchema[];
  size?: 'default' | 'small' | 'large';
  borderColor?: string;
  labelPosition?: string;
  border?: boolean;
}

export interface FormActionType {
  setProps: (props: Partial<FormProps>) => Promise<void>;
  save: () => Promise<void>;
  validate: (fn?: Fn) => Promise<any>;
  validateField: (field: string) => Promise<any>;
  resetFields: () => Promise<any>;
  setFormModel: (key: string, value: any, valueType?: string) => void;
  setFieldsValue: (values: any) => void;
  setDisable: (bol: boolean) => void;
  setShowHide: (bol: boolean) => void;
  getFieldsValue: () => Recordable;
}

export type RegisterFn = (instance: FormActionType) => void;

export type UseFormReturnType = [RegisterFn, FormActionType];
