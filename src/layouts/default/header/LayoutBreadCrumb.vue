<script lang="tsx">
  import { defineComponent, ref, unref, watchEffect } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { RouteLocationMatched, useRouter } from 'vue-router';
  import { REDIRECT_NAME } from '/@/router/constant';
  import { getMenus } from '/@/router/menus';
  import { getAllParentPath } from '/@/router/helper/menuHelper';
  import { Menu } from '/@/router/types';
  import { utilsfilter } from '/@/utils/helper/treeHelper';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { useUserStore } from '/@/stores/modules/user';
  import { LocaleType } from '/#/config';
  import { useLocale } from '/@/locales/useLocale';

  export default defineComponent({
    name: 'LayoutBreadCrumb',
    setup() {
      const routes = ref<RouteLocationMatched[]>([]);

      const { t } = useI18n();
      const { currentRoute } = useRouter();
      const userStore = useUserStore();

      const { toggleCollapsed, getCollapsed } = useMenuSetting();

      function goLogin() {
        userStore.logout(true);
      }

      function getMatched(menus: Menu[], parent: string[]) {
        const metched: Menu[] = [];
        menus.forEach((item) => {
          if (parent.includes(item.path)) {
            metched.push({
              ...item,
              name: (item.meta?.title as string) || item.name,
            });
          }
          if (item.children?.length) {
            metched.push(...getMatched(item.children, parent));
          }
        });
        return metched;
      }

      function filterItem(list: RouteLocationMatched[]) {
        return utilsfilter(list, (item) => {
          const { meta, name } = item;
          if (!meta) {
            return !!name;
          }
          const { title, hideBreadcrumb, hideMenu } = meta;
          if (!title || hideBreadcrumb || hideMenu) {
            return false;
          }
          return true;
        }).filter((item) => !item.meta?.hideBreadcrumb);
      }

      watchEffect(async () => {
        if (currentRoute.value.name === REDIRECT_NAME) return;
        const menus = await getMenus();

        // 确定目标path
        const routeMatched = currentRoute.value.matched;
        const cur = routeMatched?.[routeMatched.length - 1];
        let path = currentRoute.value.path;

        if (cur && cur?.meta?.currentActiveMenu) {
          path = cur.meta.currentActiveMenu as string;
        }

        // 取目标path的parent路由
        const parent = getAllParentPath(menus, path);

        const filterMenus = menus.filter((item) => item.path === parent[0]);
        const matched = getMatched(filterMenus, parent) as any;

        if (!matched || matched.length === 0) return;

        const breadcrumbList = filterItem(matched);

        // 取目标path本身激活路由
        if (currentRoute.value.meta?.currentActiveMenu) {
          breadcrumbList.push({
            ...currentRoute.value,
            name: currentRoute.value.meta?.title || currentRoute.value.name,
          } as unknown as RouteLocationMatched);
        }

        // 赋值
        routes.value = breadcrumbList;
      });

      function renderItem() {
        return unref(routes).map((item) => {
          return <el-breadcrumb-item>{t(item.name as string)}</el-breadcrumb-item>;
        });
      }

      const { changeLocale, getLocale, getVXETableLocale } = useLocale();

      async function toggleLocale(lang: LocaleType | string) {
        await changeLocale(lang as LocaleType);
        console.log(unref(getLocale), unref(getVXETableLocale));
      }

      return () => (
        <el-breadcrumb separator="/">
          <el-button onClick={toggleCollapsed}>
            {unref(getCollapsed) ? <span>展开</span> : <span>收起</span>}
          </el-button>
          <el-button onClick={goLogin}>登出</el-button>
          <el-button onClick={() => toggleLocale('zh_CN')}>切换中文</el-button>
          <el-button onClick={() => toggleLocale('en')}>切换英文</el-button>
          {renderItem()}
        </el-breadcrumb>
      );
    },
  });
</script>
