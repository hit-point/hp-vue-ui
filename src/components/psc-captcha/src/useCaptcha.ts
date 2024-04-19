import { ref, onMounted } from 'vue';
import { draw } from '/@/utils/imgCode';

/**
 * 绘制图形验证码
 * @param width - 图形宽度
 * @param height - 图形高度
 * @example
 */
export const useCaptcha = (width = 120, height = 30) => {
  const domRef = ref<HTMLCanvasElement>();
  const imgCode = ref('');

  // 绘制图形验证码
  function drawImgCode() {
    if (!domRef.value) return;
    imgCode.value = draw(domRef.value, width, height);
  }

  onMounted(() => {
    drawImgCode();
  });

  return {
    domRef,
    imgCode,
    drawImgCode,
  };
};
