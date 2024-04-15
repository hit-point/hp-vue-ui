<script lang="tsx">
  import { defineComponent, ref, unref } from 'vue';
  import { ClickOutSide } from '/@/components/psc-clickoutside';
  // import { BasicTabList, useTabList } from '/@/components/psc-tab-list';
  // import { getTabListInfo } from '/@/api/tabList';

  export default defineComponent({
    name: 'Home',
    components: {
      ClickOutSide,
    },
    setup() {
      const loadingV = ref(false);

      // const tabProps = {
      //   tabsList: [
      //     {
      //       label: '我的',
      //       name: '1',
      //     },
      //     {
      //       label: '其他',
      //       name: '2',
      //     },
      //     {
      //       label: '历史',
      //       name: '3',
      //     },
      //   ],
      //   activeName: '2',
      //   bomBtnTxt: '新建xxx',
      // };

      // const [TabRegister, { setProps: setTabProps }] = useTabList(tabProps);

      // const getTabList = async () => {
      //   setTabProps({
      //     tabList: [],
      //     loading: true,
      //     isDisable: true,
      //   });
      //   const res = await getTabListInfo();
      //   setTabProps({
      //     tabList: res.content,
      //     total: res.total,
      //     loading: false,
      //     isDisable: false,
      //   });
      // };

      // onMounted(() => {
      //   getTabList();
      // });

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
          {/* <el-row gutter={24}>
            <el-col span={6}>
              <BasicTabList onRegister={TabRegister} />
            </el-col>
          </el-row> */}
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
