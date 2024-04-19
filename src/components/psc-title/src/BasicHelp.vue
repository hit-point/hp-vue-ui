<script lang="tsx">
  import { CSSProperties, PropType, computed, defineComponent, h, unref } from 'vue';
  import { getSlot } from '/@/utils/helper/tsxHelper';
  import { isArr, isStr } from '/@/utils/is';
  import { useRenderIcon } from '/@/components/psc-icon';
  import { useDesign } from '/@/hooks/web/useDesign';
  export default defineComponent({
    name: 'BasicHelp',
    props: {
      maxWidth: {
        type: String,
        default: '600px',
      },
      text: { type: [Array, String] as PropType<string[] | string> },
      showIndex: { type: Boolean },
      color: { type: String, default: '#ffffff' },
      fontSize: { type: String, default: '14px' },
      placement: { type: String, default: 'right' },
    },
    setup(props, { slots }) {
      const { prefixCls } = useDesign('basic-help');
      const getTooltipStyle = computed(
        (): CSSProperties => ({
          color: props.color,
          fontSize: props.fontSize,
          maxWidth: props.maxWidth,
        }),
      );
      const tooltipSlots = computed(() => {
        return {
          default: () => (
            <span class={prefixCls}>
              {getSlot(slots) ||
                h(useRenderIcon('warn'), {
                  style: { verticalAlign: 'middle', fontSize: props.fontSize },
                })}
            </span>
          ),
          content: () => (
            <div class={`${prefixCls}__wrap`} style={unref(getTooltipStyle)}>
              {renderContent()}
            </div>
          ),
        };
      });
      function renderContent() {
        const textList = props.text;

        if (isStr(textList)) {
          return <p>{textList}</p>;
        }

        if (isArr(textList)) {
          return textList.map((text, index) => {
            return (
              <p key={text}>
                <>
                  {props.showIndex ? `${index + 1}. ` : ''}
                  {text}
                </>
              </p>
            );
          });
        }
        return null;
      }
      return () => <el-tooltip placement={props.placement} v-slots={unref(tooltipSlots)} />;
    },
  });
</script>

<style lang="scss">
  $prefix-cls: '#{$namespace}-basic-help';

  .#{$prefix-cls} {
    display: inline-block;
    margin-left: 6px;
    font-size: 14px;
    color: $text-color-help-dark;
    cursor: pointer;

    &:hover {
      color: $primary-color;
    }

    &__wrap {
      p {
        margin: 0;
      }
    }
  }
</style>
