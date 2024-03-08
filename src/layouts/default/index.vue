<script lang="tsx">
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import SideBer from './sider/index.vue';
  import Header from './header/index.vue';
  import Content from './content/index.vue';

  export default defineComponent({
    name: 'LayoutDefault',
    setup() {
      const { prefixCls } = useDesign('default-layout');

      return () => (
        <el-container class={prefixCls}>
          <el-container>
            <SideBer />
            <el-container class="is-vertical">
              <Header />
              <Content />
            </el-container>
          </el-container>
        </el-container>
      );
    },
  });
</script>

<style lang="scss">
  $prefix-cls: '#{$namespace}-default-layout';

  .#{$prefix-cls} {
    width: 100%;
    height: 100%;
    background-color: $content-bg;
  }
</style>
