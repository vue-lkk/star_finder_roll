import React, { FC, useEffect } from 'react'
import { QuestionTitlePropsType } from './interface'
import { Checkbox, Form, Input, Select } from 'antd'

const PropComponent: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType
) => {
  const { text, level, isCenter, onChange, disabled } =
    props
  // Form.Item 可以通过 dependencies 属性，设置关联字段。
  // 当关联字段的值发生变化时，会触发校验与更新。
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter })
  }, [text, level, isCenter])

  // 表单数据改变触发该事件
  function handleValueChange() {
    onChange && onChange(form.getFieldsValue())
  }

  return (
    <Form
      form={form}
      name="dependencies"
      layout="vertical"
      initialValues={{ text, level, isCenter }}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题内容"
        name="text"
        rules={[
          { required: true, message: '请输入标题内容' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
