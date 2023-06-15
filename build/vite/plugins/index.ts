import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';

import { configStyleImportPlugin } from './styleImport';
import { configElementPlusPlugin } from '../lib/elementplus';
import { configCompressPlugin } from './compress';
import { configVisualizerConfig } from './visualizer';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_LEGACY, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    //按需导入element-plus组件
    configElementPlusPlugin(),
    //按需导入element-plus和VXETable的css样式
    configStyleImportPlugin(),
  ];

  // 兼容低版本浏览器
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  // 生成打包预览
  vitePlugins.push(configVisualizerConfig());

  if (isBuild) {
    // 打包gzip | brotli压缩
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    );
  }

  return vitePlugins;
}
