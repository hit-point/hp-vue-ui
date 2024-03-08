<script lang="tsx">
  import { computed, defineComponent, h, unref, createVNode } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useMenuIcon } from '../useDefaultOpeneds';
  import { isEmpty } from 'lodash-es';
  import { itemProps } from '../props';
  export default defineComponent({
    name: 'MenuItemComponent',
    props: itemProps,
    setup(props) {
      const { t } = useI18n();
      const { resolveDynamicComp } = useMenuIcon();
      const getIcon = computed(() => props.menuItem?.icon);

      function renderDefaultIconComp() {
        return <el-icon></el-icon>;
      }

      function renderGetIconComp() {
        return <el-icon>{h(createVNode(resolveDynamicComp(props.menuItem)))}</el-icon>;
      }

      function renderIconComp() {
        return !isEmpty(unref(getIcon)) ? renderGetIconComp() : renderDefaultIconComp();
      }

      function renderItemComp() {
        return <span class={'ml-1'}>{t(props.menuItem.name)}</span>;
      }

      function renderItem() {
        return (
          <>
            {renderIconComp()}
            {renderItemComp()}
          </>
        );
      }
      return () => renderItem();
    },
  });
</script>
