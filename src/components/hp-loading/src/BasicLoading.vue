<script lang="tsx">
  import { PropType, defineComponent } from 'vue';
  export default defineComponent({
    name: 'BasicLoading',
    props: {
      loading: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
    },
    setup(props) {
      return () => (
        <section class={'basic-loading'} v-show={props.loading}>
          <div class={'basic-loading-full'}>
            <div class={'basic-loading-dots'}>
              <span class={'basic-loading-dot'}>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </span>
            </div>
          </div>
        </section>
      );
    },
  });
</script>

<style lang="scss">
  .basic-loading {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgb(240 242 245 / 40%);

    &-full {
      display: flex;
      width: 0;
      height: 0;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: $content-bg;
    }

    &-dots {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-dot {
      position: relative;
      display: inline-block;
      width: 1em;
      height: 1em;
      margin-top: 30px;
      font-size: 32px;
      transform: rotate(45deg);
      box-sizing: border-box;
      animation: ant-rotate 1.2s infinite linear;

      i {
        position: absolute;
        display: block;
        width: 14px;
        height: 14px;
        background-color: #1890ff;
        border-radius: 100%;
        opacity: 0.3;
        transform: scale(0.75);
        transform-origin: 0.5 0.5;
      }

      i:nth-child(1) {
        top: 0;
        left: 0;
        opacity: 1;
      }

      i:nth-child(2) {
        top: 0;
        right: 0;
        animation-delay: 0.4s;
        opacity: 0.8;
      }

      i:nth-child(3) {
        right: 0;
        bottom: 0;
        animation-delay: 0.8s;
        opacity: 0.6;
      }

      i:nth-child(4) {
        bottom: 0;
        left: 0;
        animation-delay: 1.2s;
        opacity: 0.4;
      }

      @keyframes ant-rotate {
        to {
          transform: rotate(405deg);
        }
      }

      @keyframes ant-rotate {
        to {
          opacity: 1;
        }
      }
    }
  }
</style>
