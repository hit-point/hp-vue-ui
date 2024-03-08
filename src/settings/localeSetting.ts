import type { LocaleSetting, LocaleType } from '/#/config';

export interface DropMenu {
  onClick?: Fn;
  to?: string;
  icon?: string;
  event: string | number;
  text: string;
  disabled?: boolean;
  divider?: boolean;
}

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh_CN',
  EN_US: 'en',
};

export const localeSetting: LocaleSetting = {
  showPicker: true,
  // 本地语言
  locale: LOCALE.ZH_CN,
  // 默认本地语言
  fallback: LOCALE.ZH_CN,
  // 可选本地语言
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],
};

// 可选语言列表
export const localeList: DropMenu[] = [
  {
    text: '简体中文',
    event: LOCALE.ZH_CN,
  },
  {
    text: 'English',
    event: LOCALE.EN_US,
  },
];
