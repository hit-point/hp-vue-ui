<script lang="tsx">
  import { defineComponent } from 'vue';
  import MenuItemContent from './MenuItemContent.vue';
  import { itemProps } from '../props';
  export default defineComponent({
    name: 'BasicMenuItem',
    props: itemProps,
    setup(props) {
      /**
       *  style={{
            margin: '4px 8px',
            clear: 'both',
            background: 'red',
            borderRadius: '3px',
          }}
       */
      return () => (
        <el-menu-item index={props.menuItem.path}>
          <MenuItemContent menuItem={props.menuItem} />
        </el-menu-item>
      );
    },
  });
</script>

<style lang="scss">
  .el-menu-item.is-active::before {
    position: absolute;
    inset: 0 8px;
    margin: 4px 0;
    clear: both;
    content: '';
    background: var(--el-color-primary) !important;
    border-radius: 3px;
  }
</style>
