<script lang="tsx">
  import { defineComponent, ref, unref, onMounted } from 'vue';
  import { ClickOutSide } from '/@/components/psc-clickoutside';
  import { BasicList, useList } from '/@/components/psc-list';
  import { getListInfo } from '/@/api/list';

  export default defineComponent({
    name: 'Home',
    components: {
      ClickOutSide,
    },
    setup() {
      const loadingV = ref(false);

      const listProps = {
        listTabs: [
          {
            label: '我的',
            name: '1',
          },
          {
            label: '其他',
            name: '2',
          },
          {
            label: '历史',
            name: '3',
          },
        ],
        activeName: '2',
        bomBtnTxt: '新建xxx',
      };

      const [ListRegister, { setProps: setListProps }] = useList(listProps);

      const getList = async () => {
        setListProps({
          list: [],
          loading: true,
          isDisable: true,
        });
        const res = await getListInfo();
        setListProps({
          list: res.content,
          total: res.total,
          loading: false,
          isDisable: false,
        });
      };

      onMounted(() => {
        getList();
      });

      return () => (
        <el-card>
          <div
            class={'demo-box'}
            v-psc-loading={unref(loadingV)}
            onClick={() => {
              loadingV.value = true;
              setTimeout(() => {
                loadingV.value = false;
              }, 1000);
            }}
          >
            <span>v-psc-loading自定义指令-仿antd加载指令</span>
          </div>
          <el-row gutter={24}>
            <el-col span={6}>
              <BasicList onRegister={ListRegister} />
            </el-col>
          </el-row>
        </el-card>
      );
    },
  });
</script>

<style lang="scss">
  .demo-box {
    display: flex;
    margin: 10px 0;
    width: 100%;
    height: 300px;
    font-size: 24px;
    color: #fff;
    background-color: #408ede;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
  }
</style>
