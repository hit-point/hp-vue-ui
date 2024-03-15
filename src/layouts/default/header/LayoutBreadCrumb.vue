<script lang="tsx">
  import { defineComponent, h, ref, unref, watchEffect } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { RouteLocationMatched, useRouter } from 'vue-router';
  import { REDIRECT_NAME } from '/@/router/constant';
  import { getMenus } from '/@/router/menus';
  import { getAllParentPath } from '/@/router/helper/menuHelper';
  import { Menu } from '/@/router/types';
  import { utilsfilter } from '/@/utils/helper/treeHelper';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { useUserStore, useUserStoreWithOut } from '/@/stores/modules/user';
  import { LocaleType } from '/#/config';
  import { useLocale } from '/@/locales/useLocale';
  import { useRenderIcon } from '/@/components/psc-icon/src/hooks';
  import Expand from '@iconify-icons/ep/expand';
  import Fold from '@iconify-icons/ep/fold';

  export default defineComponent({
    name: 'LayoutBreadCrumb',
    setup() {
      const routes = ref<RouteLocationMatched[]>([]);

      const { t } = useI18n();
      const { currentRoute } = useRouter();
      const userStore = useUserStore();
      const { getUserInfo } = useUserStoreWithOut();

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
        <div class={'layout-bread__header'}>
          <div class={'layout-bread__left'}>
            <el-icon class={'layout-bread__icon'} onClick={toggleCollapsed}>
              {unref(getCollapsed) ? (
                <>{h(useRenderIcon(Expand))}</>
              ) : (
                <>{h(useRenderIcon(Fold))}</>
              )}
            </el-icon>
            <el-breadcrumb separator="/">{renderItem()}</el-breadcrumb>
          </div>
          <div class={'layout-bread__action'}>
            <el-dropdown
              v-slots={{
                dropdown: () => (
                  <el-dropdown-menu>
                    <el-dropdown-item onClick={() => toggleLocale('zh_CN')}>
                      切换中文
                    </el-dropdown-item>
                    <el-dropdown-item onClick={() => toggleLocale('en')}>切换英文</el-dropdown-item>
                    <el-dropdown-item onClick={goLogin}>登出</el-dropdown-item>
                  </el-dropdown-menu>
                ),
              }}
            >
              <div class={' layout-header-user__dropdown hover:bg-slate-100'}>
                <el-avatar
                  class={'mr-2'}
                  shape={'circle'}
                  size={30}
                  fit={'cover'}
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                />
                <el-text>{getUserInfo.username}</el-text>
              </div>
            </el-dropdown>
          </div>
        </div>
      );
    },
  });
</script>

<style lang="scss" scoped>
  .layout-bread__header {
    display: flex;
    padding: 0 8px;
    height: 48px;
    align-items: center;
    border-bottom: 1px solid #eee;
    justify-content: space-between;
  }

  .layout-bread__icon {
    display: flex;
    height: 100%;
    padding: 1px 10px 0;
    cursor: pointer;
    align-items: center;
  }

  .layout-bread__left {
    display: flex;
    height: 100%;
    align-items: center;
  }

  .layout-bread__action {
    display: flex;
    min-width: 180px;
    align-items: center;
    justify-content: center;
  }

  .layout-header-user__dropdown {
    display: flex;
    height: 48px;
    padding: 0 0 0 10px;
    padding-right: 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    align-items: center;
  }
</style>
