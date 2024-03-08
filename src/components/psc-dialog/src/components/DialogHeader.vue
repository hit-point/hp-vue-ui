<script lang="tsx">
  import { defineComponent } from 'vue';
  import { headerProp } from '../prop';
  import { BasicTitle } from '/@/components/psc-title';
  export default defineComponent({
    name: 'DialogHeader',
    props: headerProp,
    components: {
      BasicTitle,
    },
    setup(props) {
      return () => <BasicTitle helpMessage={props.helpMessage}>{props.title}</BasicTitle>;
    },
  });
</script>
