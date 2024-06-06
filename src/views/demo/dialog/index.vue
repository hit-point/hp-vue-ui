<script lang="tsx">
  import { defineComponent } from 'vue';
  import { useDialog } from '../../../components/hp-dialog';
  import { useDrawer } from '../../../components/hp-drawer';
  import DemoDialog from './DemoDialog.vue';
  import DemoDrawer from './DemoDrawer.vue';

  export default defineComponent({
    name: 'demoDialog',
    components: {
      DemoDialog,
    },
    setup() {
      const [DialogRegister, { openDialog }] = useDialog();
      const [DrawerRegister, { openDrawer }] = useDrawer();

      return () => (
        <el-card>
          <el-button
            onClick={() => {
              openDialog(true, {
                title: 'DialogTitle',
              });
            }}
          >
            打开dialog
          </el-button>
          <el-button
            onClick={() => {
              openDrawer(true, {
                title: 'DrawerTitle',
              });
            }}
          >
            打开drawer
          </el-button>
          <DemoDialog onRegister={DialogRegister} />
          <DemoDrawer onRegister={DrawerRegister} />
        </el-card>
      );
    },
  });
</script>
