<script lang="tsx">
  import { defineComponent, reactive } from 'vue';
  import { Message } from '/@/utils/message';
  import { useUserStore } from '/@/stores/modules/user';

  export default defineComponent({
    name: 'Login',
    setup() {
      const userStore = useUserStore();
      const loginParams = reactive({
        username: 'pasco',
        password: '123456',
      });

      async function handleLogin() {
        await userStore.login({
          password: loginParams.password,
          username: loginParams.username,
          mode: 'none', // 不要默认的错误提示
        });

        Message('登录成功', { type: 'success' });
      }

      return () => (
        <el-card class="w-1/2 m-auto text-center">
          <el-button onClick={handleLogin}>点击登录</el-button>
        </el-card>
      );
    },
  });
</script>
