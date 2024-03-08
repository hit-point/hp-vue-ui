<script lang="tsx">
  import { computed, defineComponent, onMounted, reactive, ref, unref } from 'vue';
  import { BasicButton } from '/@/components/psc-button';
  import { loginApi } from '/@/api/sys/user';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { ClickOutSide } from '/@/components/psc-clickoutside';
  import RippleDirective from '/@/directives/ripple';
  import RepeatDirective from '/@/directives/repeatClick';
  import ClickOutsideDirective from '/@/directives/clickOutside';
  import { BasicReadonly } from '/@/components/psc-readonly';
  import { BasicSiderList, useSiderList } from '/@/components/psc-sider-list';
  import { getSiderInfo } from '/@/api/sider';

  export default defineComponent({
    name: 'Home',
    components: {
      ClickOutSide,
    },
    directives: {
      Ripple: RippleDirective,
      RepeatClick: RepeatDirective,
      ClickOutside: ClickOutsideDirective,
    },
    setup() {
      const { t } = useI18n();
      const apiData = ref();
      const loading = ref(false);
      const loadingV = ref(false);
      const textV = ref('ClickV');
      const textC = ref('ClickC');
      const loginParams = reactive({
        username: 'pasco',
        password: '123456',
      });
      const valProps = {
        readonlyValue: 'lihu,wanghua',
        keyToValList: [
          {
            id: '1',
            key: 'lishen',
            value: '李申1',
          },
          {
            id: '2',
            key: 'wanghua',
            value: '王华2',
          },
          {
            id: '3',
            key: 'lihu',
            value:
              '过长文字显示省略号并出现气泡框过长文字显示省略号并出现气泡框过长文字显示省略号并出现气泡框',
          },
        ],
      };
      const fileProps = {
        keyToValList: [
          {
            fileName: '接口下载文件',
            fileAddr: '/addr',
            fileId: '123',
          },
          {
            name: '本地下载文件',
            uid: '321',
          },
          {
            name: '过长文字显示省略号并出现气泡框过长文字显示省略号并出现气泡框过长文字显示省略号并出现气泡框',
            uid: '321',
          },
        ],
      };
      const siderProps = {
        tabsList: [
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

      const [SiderRegister, { setProps: setSiderProps }] = useSiderList(siderProps);

      const getSiderList = async () => {
        setSiderProps({
          siderList: [],
          loading: true,
          isDisable: true,
        });
        const res = await getSiderInfo();
        setSiderProps({
          siderList: res.content,
          total: res.total,
          loading: false,
          isDisable: false,
        });
      };

      const btnProps = computed(() => {
        return {
          loading: unref(loading),
          type: 'primary',
          onClick: login,
        };
      });

      async function login() {
        loading.value = true;
        apiData.value = null;
        const data = await loginApi(loginParams);
        apiData.value = data;
        console.log(data);
        loading.value = false;
      }

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

      onMounted(() => {
        getSiderList();
      });

      return () => (
        <el-card>
          国际化：{t('menus.home')}
          <BasicButton {...unref(btnProps)}>点击按钮加载样式</BasicButton>
          <BasicButton v-auth={RoleEnum.SUPER}>v-auth自定义指令-拥有super角色权限可见</BasicButton>
          <BasicButton v-repeat-click={login}>v-repeat-click自定义指令-重复点击</BasicButton>
          <BasicSiderList onRegister={SiderRegister} />
          <div class={'demo-box'} v-ripple>
            v-ripple自定义指令-水波纹
          </div>
          <span>{JSON.stringify(unref(apiData))}</span>
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
          只读组件
          <BasicReadonly {...valProps} />
          <BasicReadonly {...fileProps} />
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
