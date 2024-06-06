<script lang="tsx">
  import { computed, defineComponent, h, unref, createVNode } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useMenuIcon } from '../useMenuIcon';
  import { isEmpty } from 'lodash-es';
  import { itemProps } from '../props';
  import { BasicReadonly } from '/@/components/hp-readonly';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  export default defineComponent({
    name: 'MenuItemComponent',
    props: itemProps,
    setup(props) {
      const { t } = useI18n();
      const { resolveDynamicComp } = useMenuIcon();
      const getIcon = computed(() => props.menuItem?.icon);
      const { getMenuTextColor } = useMenuSetting();

      function renderDefaultIconComp() {
        return <></>;
      }

      function renderGetIconComp() {
        return (
          <el-icon style={{ color: unref(getMenuTextColor) }}>
            {h(createVNode(resolveDynamicComp(props.menuItem)))}
          </el-icon>
        );
      }

      function renderIconComp() {
        return !isEmpty(unref(getIcon)) ? renderGetIconComp() : renderDefaultIconComp();
      }

      function renderItemComp() {
        return (
          <BasicReadonly
            style={{ color: unref(getMenuTextColor), zIndex: 1 }}
            textVal={t(props.menuItem.name)}
          />
        );
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
