import React, { FC, useEffect } from 'react'
import { QuestionTextareaPropsType } from './interface'
import { Form, Input } from 'antd'

const PropComponent: FC<QuestionTextareaPropsType> = (
  props: QuestionTextareaPropsType
) => {
  const { title, placeholder, onChange, disabled } = props
  // Form.Item 可以通过 dependencies 属性，设置关联字段。当关联
  // 字段的值发生变化时，会触发校验与更新。
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])

  // 表单数据改变触发该事件
  function handleValueChange() {
    onChange && onChange(form.getFieldsValue())
  }

  return (
    <Form
      form={form}
      name="dependencies"
      layout="vertical"
      initialValues={{ title, placeholder }}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
