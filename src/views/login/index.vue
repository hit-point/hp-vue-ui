<script lang="tsx">
  import { computed, defineComponent, nextTick, reactive, ref, unref } from 'vue';
  import { Message } from '/@/utils/message';
  import Motion from '/@/hooks/web/useMotion';
  import { useUserStore } from '/@/stores/modules/user';
  import { BasicCaptcha } from '/@/components/psc-captcha';
  import { BasicButton } from '/@/components/psc-button';

  export default defineComponent({
    name: 'Login',
    setup() {
      const captcha = ref<string>();
      const loginFormRef = ref();
      const loading = ref(false);
      const userStore = useUserStore();
      const loginData = reactive({
        username: 'admin',
        password: '123456',
        captcha: '',
      });

      // const { pkg } = __APP_INFO__;

      // const { version } = pkg;

      const loginRules = computed(() => {
        return {
          username: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入用户名',
            },
          ],
          password: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入密码',
            },
            {
              min: 6,
              message: '密码不能少于6位',
              trigger: 'blur',
            },
          ],
          captcha: [
            {
              validator: (_rule, value, callback) => {
                if (value === '') {
                  callback('请输入验证码');
                } else if (Number(unref(captcha)) !== Number(value)) {
                  callback(new Error('请输入正确的验证码'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
        };
      });

      const btnProps = computed(() => {
        return {
          loading: unref(loading),
          type: 'primary',
          class: 'w-full',
          onClick: login,
        };
      });

      async function login() {
        if (!unref(loginFormRef)) return;
        loginFormRef.value.validate((valid: boolean) => {
          if (valid) {
            loading.value = true;
            handleLogin();
          }
        });
      }

      async function handleLogin() {
        try {
          await userStore.login({
            ...loginData,
          });

          nextTick(() => {
            Message('登录成功', { type: 'success' });
          });
        } finally {
          loading.value = false;
        }
      }

      return () => (
        <div class="login-container">
          <div class="login-box">
            <Motion class="login-form">
              <el-card style={{ borderRadius: '4%' }}>
                <h2>Pasco Admin</h2>
                <el-form ref={loginFormRef} model={loginData} rules={loginRules}>
                  <el-form-item prop={'username'}>
                    <div class="w-full">
                      <el-input
                        ref="username"
                        v-model={loginData.username}
                        placeholder={'用户名'}
                      />
                    </div>
                  </el-form-item>
                  <el-form-item prop={'password'}>
                    <div class="w-full">
                      <el-input
                        ref="password"
                        v-model={loginData.password}
                        placeholder={'密码'}
                        show-password
                      />
                    </div>
                  </el-form-item>
                  <el-form-item prop={'captcha'}>
                    <el-input
                      v-model={loginData.captcha}
                      auto-complete={'off'}
                      placeholder={'验证码'}
                      v-slots={{
                        suffix: () => <BasicCaptcha v-model={[captcha.value, 'code']} />,
                      }}
                    />
                  </el-form-item>
                </el-form>
                <BasicButton {...unref(btnProps)}>登录</BasicButton>
                <div class={'flex justify-around'}>
                  <el-text>账号：admin/test</el-text>
                  <br />
                  <el-text>密码：123456</el-text>
                </div>
              </el-card>
            </Motion>
          </div>
        </div>
      );
    },
  });
</script>
