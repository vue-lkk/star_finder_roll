import React, { FC, useEffect } from 'react'
import { QuestionInfoPropsType } from './interface'
import { Checkbox, Form, Input } from 'antd'
const { TextArea } = Input

const PropComponent: FC<QuestionInfoPropsType> = (
  props: QuestionInfoPropsType
) => {
  const { title, desc, onChange, disabled } = props
  // Form.Item 可以通过 dependencies 属性，设置关联字段。
  // 当关联字段的值发生变化时，会触发校验与更新。
  const [form] = Form.useForm()

  // 监听 text isCenter 变化
  useEffect(() => {
    // 设置新的值
    form.setFieldsValue({ title, desc })
  }, [title, desc])

  // 表单数据改变触发该事件
  function handleValueChange() {
    onChange && onChange(form.getFieldsValue())
  }

  return (
    <Form
      form={form}
      name="dependencies"
      layout="vertical"
      initialValues={{ title, desc }}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[
          { required: true, message: '请输入问卷标题' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea autoSize={{ minRows: 3, maxRows: 10 }} />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
