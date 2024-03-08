import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';

import { configCompressPlugin } from './compress';
import { configHtmlPlugin } from './html';
import { configVisualizerConfig } from './visualizer';
import { configMockPlugin } from './mock';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    VITE_USE_MOCK,
  } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx()];

  // 兼容低版本浏览器
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  // 生成打包预览
  vitePlugins.push(configVisualizerConfig());

  // 生成mock数据
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  // 用于最小化和使用index.html中ejs模板语法的插件
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  if (isBuild) {
    // 打包gzip | brotli压缩
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    );
  }

  return vitePlugins;
}
