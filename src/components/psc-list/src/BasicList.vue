<script lang="tsx">
  import { computed, defineComponent, h, onMounted, ref, unref, watch } from 'vue';
  import { listProps } from './props';
  import { ListActionType, ListTabsType, ListPropsType } from './types';
  import { deepMerge } from '/@/utils';
  import Search from '@iconify-icons/ep/search';
  import { useRenderIcon } from '/@/components/psc-icon';
  import { BasicTxt } from '/@/components/psc-readonly';
  export default defineComponent({
    name: 'BasicList',
    props: listProps,
    emits: ['register', 'tabChange'],
    setup(props, { emit }) {
      const propsRef = ref<Partial<ListPropsType>>();
      const activeNameRef = ref('');
      const searchInput = ref('');
      const getProps = computed(() => {
        return { ...props, ...unref(propsRef) };
      });

      const setProps = (props: Partial<ListPropsType>) => {
        propsRef.value = deepMerge(unref(propsRef) || {}, props);
      };

      const tabListAction: ListActionType = {
        setProps,
      };

      watch(
        () => unref(getProps).activeName,
        () => {
          activeNameRef.value = unref(getProps).activeName;
        },
      );

      onMounted(() => {
        emit('register', tabListAction);
      });

      const renderLabel = (x: ListTabsType) => {
        return <span>{x.label}</span>;
      };

      const renderDefault = computed(() => {
        const { list, loading, total, isShowBomBtn, bomBtnTxt } = unref(getProps);
        return (
          <div v-psc-loading={loading} style={{ minHeight: '350px', textAlign: 'center' }}>
            <el-input v-model={searchInput.value} prefixIcon={h(useRenderIcon(Search))} clearable />
            <ul>
              {list.map((x) => (
                <li key={x.id} class={'tab-panel-content__li'}>
                  <BasicTxt>
                    {x.name}-{x.id}
                  </BasicTxt>
                </li>
              ))}
            </ul>
            <div class="tab-panel-footer">
              <el-pagination
                layout={'prev,pager,next'}
                total={total}
                pagerCount={5}
                small
                hideOnSinglePage
              />
              {isShowBomBtn && !loading ? <el-button>{bomBtnTxt}</el-button> : null}
            </div>
          </div>
        );
      });

      const render = () => {
        const { listTabs, isDisable } = unref(getProps);
        return (
          <el-tabs
            v-model={activeNameRef.value}
            onTabChange={(name) => emit('tabChange', name)}
            stretch
          >
            {listTabs.map((x) => (
              <el-tab-pane
                key={x.name}
                name={x.name}
                disabled={isDisable}
                v-slots={{
                  label: () => renderLabel(x),
                  default: () => (unref(activeNameRef) === x.name ? unref(renderDefault) : null),
                }}
                lazy
              />
            ))}
          </el-tabs>
        );
      };

      return () => render();
    },
  });
</script>

<style lang="scss">
  .tab-panel-content__li {
    height: 34px;
    line-height: 34px;
    padding: 0 8px;

    // border-bottom: 1px dashed #ccc;

    font-size: 14px;
    color: #777;
    cursor: pointer;
  }

  .tab-panel-content__li:hover {
    border-radius: 8px;
    background-color: #eaf8fe;
    color: #333;
  }

  .tab-panel-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
