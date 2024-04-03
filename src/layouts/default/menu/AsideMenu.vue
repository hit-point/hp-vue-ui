<script lang="tsx">
  import { computed, defineComponent, unref } from 'vue';
  import { useSplitMenu } from './useLayoutMenu';
  import { BasicMenu } from '/@/components/psc-menu';
  import { useGo } from '/@/hooks/web/usePage';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { BasicReadonly } from '/@/components/psc-readonly';

  export default defineComponent({
    name: 'LayoutAsideMenu',
    setup() {
      const go = useGo();
      const { prefixCls } = useDesign('layout-menu');
      const {
        getUniqueOpened,
        getMenuMode,
        getCollapsed,
        getMenuBgColor,
        getMenuTextColor,
        getMenuActiveTextColor,
      } = useMenuSetting();
      const { menusRef } = useSplitMenu();
      const getCommonProps = computed(() => {
        const menus = unref(menusRef);
        return {
          menus: menus,
          uniqueOpened: unref(getUniqueOpened),
          mode: unref(getMenuMode),
          collapse: unref(getCollapsed),
          backgroundColor: unref(getMenuBgColor),
          textColor: unref(getMenuTextColor),
          activeTextColor: unref(getMenuActiveTextColor),
          onSelect: handleMenuClick,
        };
      });

      function handleMenuClick(path: string) {
        go(path);
      }

      function renderItem() {
        const { menus, ...menuProps } = unref(getCommonProps);

        return <BasicMenu {...menuProps} menuItems={menus} />;
      }

      return () => (
        <>
          <div class={`${prefixCls}-logo`}>
            <img src="/resource/img/logo.svg" />
            {!unref(getCollapsed) ? (
              <BasicReadonly
                style={{ color: unref(getCommonProps).textColor }}
                class={`${prefixCls}-title`}
                readonlyValue={'Pasco Admin'}
              />
            ) : null}
          </div>
          {renderItem()}
        </>
      );
    },
  });
</script>

<style lang="scss">
  $prefix-cls: '#{$namespace}-layout-menu';

  .#{$prefix-cls} {
    &-logo {
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s ease;
      height: 28px;
      padding: 10px 4px 10px 16px;

      img {
        width: 32px;
        height: 32px;
      }
    }

    &-title {
      font-size: 16px;
      font-weight: 700;
      transition: all 0.2s;
      line-height: normal;
      margin-left: 0.5rem;
    }
  }
</style>
