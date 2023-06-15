// 参考https://blog.csdn.net/m0_67393295/article/details/123432312
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export function configElementPlusPlugin() {
  return Components({
    resolvers: [ElementPlusResolver()],
  });
}
