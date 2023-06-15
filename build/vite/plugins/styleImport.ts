// 参考https://vxetable.cn/#/table/start/use
// import styleImport from 'vite-plugin-style-import'
//2.0之后版本用createStyleImportPlugin
import {
  createStyleImportPlugin,
  ElementPlusResolve,
  VxeTableResolve,
} from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  // 旧版本
  // return styleImport({
  //   libs: [
  //     {
  //       libraryName: 'element-plus',
  //       esModule: true,
  //       resolveStyle: (name) => {
  //         return `element-plus/lib/theme-chalk/${name}.css`;
  //       },
  //     },
  //   ],
  // }),
  return createStyleImportPlugin({
    resolves: [VxeTableResolve(), ElementPlusResolve()],
  });
}
