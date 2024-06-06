<script setup lang="ts">
  import { BasicForm, useForm } from '../../../components/hp-form';
  const validatePass = (_rule, value, callback) => {
    if (value === '') {
      callback(new Error('Please input the value'));
    } else if (value !== '指定规则数据') {
      callback(new Error('Please input 指定规则数据'));
    } else {
      callback();
    }
  };
  const [register, { getFieldsValue }] = useForm({
    rules: {
      field1: [{ required: true, validator: validatePass, trigger: 'blur' }],
      field2: [{ required: true, message: '校验信息', trigger: 'blur' }],
    },
    schemas: [
      {
        field: 'field1',
        label: '输入框示例',
        require: true,
        component: 'Input',
        changeEvent: 'input',
        componentProps: {
          clearable: true,
        },
        colProps: {
          span: 12,
        },
      },
      {
        field: 'field2',
        label: '下拉框使用',
        require: true,
        component: 'ApiSelect',
        valueField: 'value',
        componentProps: {
          filterable: true,
          clearable: true,
          options: [
            {
              label: '项1',
              value: 1,
            },
            {
              label: '项2',
              value: 2,
            },
            {
              label: '项3',
              value: 3,
            },
          ],
        },
        colProps: {
          span: 12,
        },
      },
    ],
    model: {
      field1: '示例数据',
      field2: 1,
    },
  });
</script>

<template>
  <el-card>
    <el-row>
      <el-col :span="24">
        <BasicForm @register="register" />
        {{ getFieldsValue() }}
      </el-col>
    </el-row>
  </el-card>
</template>
