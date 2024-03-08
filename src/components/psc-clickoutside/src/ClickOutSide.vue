<script lang="tsx">
  import { defineComponent, onMounted, ref } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import { getSlot } from '/@/utils/helper/tsxHelper';
  export default defineComponent({
    name: 'ClickOutSide',
    emits: ['clickOutside', 'mounted'],
    setup(_props, { emit, slots }) {
      const wrap = ref(null);

      onClickOutside(wrap, () => {
        emit('clickOutside');
      });

      onMounted(() => {
        emit('mounted');
      });
      return () => <div ref={wrap}>{getSlot(slots)}</div>;
    },
  });
</script>
