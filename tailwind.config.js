/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 手动切换暗黑模式
  corePlugins: {
    preflight: false, // 禁止tailwindcss的默认属性
  },
  // content里面配置的是项目中需要解析的html和js以及vue等文件
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // 配合暗黑主题
  theme: {
    extend: {
      colors: {
        bg_color: 'var(--el-bg-color)',
        primary: 'var(--el-color-primary)',
        primary_light_9: 'var(--el-color-primary-light-9)',
        text_color_primary: 'var(--el-text-color-primary)',
        text_color_regular: 'var(--el-text-color-regular)',
        text_color_disabled: 'var(--el-text-color-disabled)',
      },
    },
  },
};
