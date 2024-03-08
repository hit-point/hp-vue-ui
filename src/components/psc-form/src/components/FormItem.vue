<script lang="tsx">
  import { PropType, Ref, computed, defineComponent, toRefs, unref } from 'vue';
  import { FormProps, FormSchema } from '../typing';
  import { componentMap } from '../componentMaps';
  import { upperFirst } from 'lodash-es';
  import { getSlot } from '/@/utils/helper/tsxHelper';
  import { ElFormItem } from 'element-plus';
  export default defineComponent({
    name: 'FormItem',
    props: {
      schema: {
        type: Object as PropType<FormSchema>,
        default: () => {},
      },
      formProps: {
        type: Object as PropType<FormProps>,
        default: () => {},
      },
      formModel: {
        type: Object as PropType<Recordable>,
        default: () => {},
      },
      setFormModel: {
        type: Function as PropType<(key: string, value: any, valueType: string) => void>,
        default: null,
      },
      validateField: {
        type: Function as PropType<(field: string) => void>,
        default: null,
      },
      allDefaultValues: {
        type: Object as PropType<Recordable>,
        default: () => {},
      },
      disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      hideRef: {
        type: Object as PropType<Recordable>,
        default: () => ({ isHide: true }),
      },
    },
    setup(props, { slots }) {
      const { schema, formProps } = toRefs(props) as {
        schema: Ref<FormSchema>;
        formProps: Ref<FormProps>;
      };

      const getValues = computed(() => {
        const { allDefaultValues, formModel, schema } = props;
        return {
          field: schema.field,
          model: formModel,
          values: {
            ...allDefaultValues,
            ...formModel,
          } as Recordable,
          schema: schema,
        };
      });

      const getComponentsProps = computed(() => {
        const { componentProps = {} } = props.schema;
        return componentProps as Recordable;
      });

      function rederComponent() {
        const { component, field, valueField, changeEvent = 'change', valueType } = props.schema;

        const Comp =
          typeof component === 'object'
            ? component
            : (componentMap.get(component) as ReturnType<typeof defineComponent>);

        const getDisable = computed(() => {
          const disabled = props.disabled;
          return disabled;
        });

        const propsData = {
          disabled: unref(getDisable),
          style: 'width: 100%;padding-right: 8px',
          ...unref(getComponentsProps),
        };

        const eventKey = `on${upperFirst(changeEvent)}`;

        const on = {
          [eventKey]: (e) => {
            props.setFormModel(field, e, valueType);
          },
        };

        const bindValue = {
          // 查看elementplus官网获取有关modelValue的信息
          [valueField || 'modelValue']: props.formModel[field],
        };

        const compAttr = {
          ...on,
          ...propsData,
          ...bindValue,
        };

        return component !== 'Txt' ? (
          <Comp {...compAttr} />
        ) : (
          <span>{bindValue[valueField || 'modelValue']}</span>
        );
      }

      function renderItem() {
        const { label, field } = unref(schema);
        const { colSlot } = unref(getComponentsProps);
        const { size } = unref(formProps);
        const values = unref(getValues);

        const getContent = () => {
          return colSlot ? getSlot(slots, colSlot, values) : rederComponent();
        };

        return (
          <ElFormItem
            size={size}
            prop={field}
            v-slots={{
              label: () => <span>{label}</span>,
              default: () => <>{getContent()}</>,
            }}
          />
        );
      }

      function render() {
        const { colProps = {}, colSlot, isHide } = unref(schema);
        const realColProps = { ...colProps };
        const values = unref(getValues);
        const getContent = () => {
          return colSlot ? getSlot(slots, colSlot, values) : renderItem();
        };

        return (
          <el-col
            {...realColProps}
            style={!isHide || !props.hideRef.isHide ? 'display: block' : 'display: none'}
          >
            {getContent()}
          </el-col>
        );
      }

      return () => <>{render()}</>;
    },
  });
</script>
