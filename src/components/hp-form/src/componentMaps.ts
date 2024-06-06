import { Component } from 'vue';
import { ComponentType } from './typing';
import { ElInput, ElInputNumber, ElRate, ElSelect } from 'element-plus';
import FormDatePicker from './components/FormDatePicker.vue';
import ApiSelect from './components/ApiSelect.vue';
import ApiRadioGroup from './components/ApiRadioGroup.vue';
import ApiCheckBoxGroup from './components/ApiCheckBoxGroup.vue';
import StrengthMeter from './components/StrengthMeter.vue';
import ApiTree from './components/ApiTree.vue';

const componentMap = new Map<ComponentType, Component>();

componentMap.set('Input', ElInput);
componentMap.set('InputNumber', ElInputNumber);
componentMap.set('Rate', ElRate);
componentMap.set('DatePicker', FormDatePicker);
componentMap.set('Select', ElSelect);
componentMap.set('ApiSelect', ApiSelect);
componentMap.set('ApiRadioGroup', ApiRadioGroup);
componentMap.set('ApiCheckBoxGroup', ApiCheckBoxGroup);
componentMap.set('StrengthMeter', StrengthMeter);
componentMap.set('ApiTree', ApiTree);

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };
