import { withInstall } from '/@/utils';
import basicReadonly from './src/BasicReadonly.vue';
import txtComp from './src/components/TxtComp.vue';
import fileList from './src/components/FileList.vue';

export const BasicReadonly = withInstall(basicReadonly);
export const BasicTxt = withInstall(txtComp);
export const BasicFile = withInstall(fileList);
