<script lang="tsx">
  import { defineComponent, computed, unref } from 'vue';
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
  import en from 'element-plus/dist/locale/en.mjs';
  import { AppProvider } from '/@/components/psc-application';
  import { useLocale } from '/@/locales/useLocale';
  import { RouterView } from 'vue-router';
  import { LOCALE } from '/@/settings/localeSetting';
  import 'dayjs/locale/zh-cn';

  export default defineComponent({
    name: 'app',
    components: {
      AppProvider,
    },
    setup() {
      const { getLocale } = useLocale();

      const locale = computed(() => (unref(getLocale) === LOCALE.ZH_CN ? zhCn : en));

      return () => (
        <el-config-provider locale={unref(locale)}>
          <AppProvider>
            <RouterView />
          </AppProvider>
        </el-config-provider>
      );
    },
  });
</script>
