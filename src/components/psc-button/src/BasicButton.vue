<script lang="tsx">
  import { computed, defineComponent, unref, useAttrs, useSlots } from 'vue';
  export default defineComponent({
    name: 'BasicButton',
    setup() {
      const attrs = useAttrs();
      const slots = useSlots();
      const getBindValue = computed(() => ({ ...unref(attrs) }));
      const d =
        'M 30 15 L 28 17 M 25.61 25.61 A 15 15, 0, 0, 1, 15 30 A 15 15, 0, 1, 1, 27.99 7.5 L 15 15';
      const slot = {
        loading: () => (
          <svg class={'custom-loading__circular'} viewBox={'-10, -10, 50, 50'}>
            <path class={'path'} d={d} />
          </svg>
        ),
        default: () => slots.default?.(),
      };
      return () => <el-button {...unref(getBindValue)} v-slots={slot} />;
    },
  });
</script>

<style lang="scss" scoped>
  .el-button .custom-loading__circular {
    width: 18px;
    height: 18px;
    margin-right: 6px;
    animation: loading-rotate 1s linear infinite;

    .path {
      fill: rgb(0 0 0 / 0%);
      stroke-width: 4px;
      stroke: var(--el-button-text-color);
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-linecap: round;
      animation: loading-dash 0.75s ease-in-out infoinite;
    }
  }
</style>
