<script lang="tsx">
  import { defineComponent } from 'vue';
  import MenuItemContent from './MenuItemContent.vue';
  import { itemProps } from '../props';
  export default defineComponent({
    name: 'BasicMenuItem',
    props: itemProps,
    setup(props) {
      function renderItem() {
        return (
          <el-menu-item index={props.menuItem.path}>
            <MenuItemContent menuItem={props.menuItem} />
          </el-menu-item>
        );
      }
      return () => renderItem();
    },
  });
</script>
