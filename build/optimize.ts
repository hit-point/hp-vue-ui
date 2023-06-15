/**
 * 用于 `vite.config.ts` 的 `optimizeDeps.include` 依赖预构建配置项
 * 引入到 src/main.ts 文件里，就不需要再添加到 include 了
 */
const include = ['dayjs', 'axios', 'pinia', '@vueuse/core'];

/**
 * 预构建中强制排除的依赖项
 * 本地图标模块应该加入到下面的 `exclude` 里
 */
const exclude = [];

export { include, exclude };
