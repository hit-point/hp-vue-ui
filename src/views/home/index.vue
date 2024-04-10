<script lang="tsx">
  import { defineComponent, ref, unref } from 'vue';
  import { ClickOutSide } from '/@/components/psc-clickoutside';
  import ClickOutsideDirective from '/@/directives/clickOutside';
  // import { BasicTabList, useTabList } from '/@/components/psc-tab-list';
  // import { getTabListInfo } from '/@/api/tabList';

  export default defineComponent({
    name: 'Home',
    components: {
      ClickOutSide,
    },
    directives: {
      ClickOutside: ClickOutsideDirective,
    },
    setup() {
      const loadingV = ref(false);
      const textV = ref('ClickV');
      const textC = ref('ClickC');

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

      function handleClickOutsideV() {
        textV.value = 'ClickV Out Side';
      }

      function innerClickV() {
        textV.value = 'ClickV Inner';
      }
      function handleClickOutsideC() {
        textC.value = 'ClickC Out Side';
      }

      function innerClickC() {
        textC.value = 'ClickC Inner';
      }

      // onMounted(() => {
      //   getTabList();
      // });

      return () => (
        <el-card>
          <div v-click-outside={handleClickOutsideV}>
            <div class={'demo-box'} onClick={innerClickV}>
              v-click-outside自定义指令-点内外部触发不同事件{unref(textV)}
            </div>
          </div>
          <ClickOutSide onClickOutside={handleClickOutsideC}>
            <div class={'demo-box'} onClick={innerClickC}>
              ClickOutSide组件-点内外部触发不同事件{unref(textC)}
            </div>
          </ClickOutSide>
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
