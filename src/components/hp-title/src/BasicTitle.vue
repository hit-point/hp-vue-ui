<script lang="tsx">
  import { PropType, computed, defineAsyncComponent, defineComponent, unref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { getSlot } from '/@/utils/helper/tsxHelper';
  export default defineComponent({
    name: 'BasicTitle',
    props: {
      span: { type: Boolean },
      normal: { type: Boolean },
      helpMessage: {
        type: [String, Array] as PropType<string | string[]>,
        default: '',
      },
    },
    setup(props, { slots }) {
      const { prefixCls } = useDesign('basic-title');
      const BasicHelp = defineAsyncComponent(() => import('./BasicHelp.vue'));
      const getClass = computed(() => [
        prefixCls,
        { [`${prefixCls}-show-span`]: props.span && slots.default },
        { [`${prefixCls}-normal`]: props.normal },
      ]);
      const getBasicHelp = computed(() => {
        return props.helpMessage ? (
          <BasicHelp class={`${prefixCls}-help`} text={props.helpMessage} />
        ) : null;
      });
      return () => (
        <span class={unref(getClass)}>
          {getSlot(slots)}
          {unref(getBasicHelp)}
        </span>
      );
    },
  });
</script>

<style lang="scss">
  $prefix-cls: '#{$namespace}-basic-title';

  .#{$prefix-cls} {
    position: relative;
    display: flex;
    padding-left: 7px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    cursor: pointer;
    user-select: none;

    &-normal {
      font-size: 14px;
      font-weight: 500;
    }

    &-show-span::before {
      position: absolute;
      top: 4px;
      left: 0;
      width: 3px;
      height: 16px;
      margin-right: 4px;
      background-color: $primary-color;
      content: '';
    }

    &-help {
      margin-left: 10px;
    }
  }
</style>
