import type { App } from 'vue';
import type { I18n, I18nOptions } from 'vue-i18n';

import { createI18n } from 'vue-i18n';
import { setHtmlPageLang, setLoadLocalePool } from './helper';
import { localeSetting } from '/@/settings/localeSetting';
import { useLocaleStoreWithOut } from '/@/stores/modules/locale';
import { VXETable } from 'vxe-table';

const { fallback, availableLocales } = localeSetting;

export let i18n: ReturnType<typeof createI18n | any>;

async function createI18nOptions(): Promise<I18nOptions> {
  const localeStore = useLocaleStoreWithOut();
  const locale = localeStore.getLocale;
  const defaultLocal = await import(`./lang/${locale}.ts`);
  const message = defaultLocal.default?.message ?? {};

  setHtmlPageLang(locale);
  setLoadLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale);
  });

  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    messages: {
      [locale]: message,
    },
    availableLocales: availableLocales,
    sync: true, // 如果不想从全局范围继承区域设置，则需要将i18n组件选项的sync设置为false.
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

// 使用glob设置i18n实例
export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options) as I18n;
  VXETable.setup({
    // 对组件内置的提示语进行国际化翻译
    i18n: (key, args) => i18n.global.t(key, args),
  });
  app.use(i18n);
}
