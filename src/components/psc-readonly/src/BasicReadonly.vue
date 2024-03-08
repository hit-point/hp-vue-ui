<script lang="tsx">
  import { computed, defineComponent, unref, defineAsyncComponent } from 'vue';
  import { cloneDeep, isEmpty, isString } from 'lodash-es';
  import { getSlot } from '/@/utils/helper/tsxHelper';
  import { getFieldValue } from './utils';
  import { propRules } from './const';
  import { readonlyProps } from './props';
  export default defineComponent({
    name: 'BasicReadonly',
    props: readonlyProps,
    setup(props, { slots, attrs }) {
      const FileList = defineAsyncComponent(() => import('./components/FileList.vue'));
      const TxtComp = defineAsyncComponent(() => import('./components/TxtComp.vue'));
      const getProps = computed(() => {
        const cloneProp = cloneDeep(props);
        Object.keys(cloneProp).forEach((x) => {
          cloneProp[x] = getFieldValue(x, propRules, props);
        });
        return unref(cloneProp);
      });
      const getBindValues = computed(() => {
        return {
          ...attrs,
          ...unref(getProps),
        };
      });
      const renderFileItem = computed(() => {
        const { keyToValList, isFileDelete } = unref(getBindValues);
        return <FileList keyToValList={keyToValList} isDelete={isFileDelete} />;
      });
      const renderRealVal = computed(() => {
        let valStr = '';
        const { readonlyValue, keyToValList } = unref(getBindValues);
        const valArr = isString(readonlyValue) ? readonlyValue.split(',') : readonlyValue;
        for (let i = 0; i < valArr.length; i++) {
          const element = valArr[i];
          const findPropList = keyToValList.find((x) => x.key === element);
          findPropList && (valStr += findPropList.value);
          i !== valArr.length - 1 && (valStr += ',');
        }
        const val = isEmpty(keyToValList) ? readonlyValue : valStr;
        return <TxtComp>{val}</TxtComp>;
      });
      const renderItem = computed(() => {
        const { keyToValList } = unref(getBindValues);
        const isFileType = keyToValList.findIndex((x) => x.uid || x.fileId) !== -1;
        return isFileType ? unref(renderFileItem) : unref(renderRealVal);
      });
      return () => <> {getSlot(slots) ? getSlot(slots) : unref(renderItem)}</>;
    },
  });
</script>
