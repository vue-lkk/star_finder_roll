import React, { FC, useEffect } from 'react'
import { QuestionParagraphPropsType } from './interface'
import { Checkbox, Form, Input } from 'antd'
const { TextArea } = Input

const PropComponent: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType
) => {
  const { text, isCenter, onChange, disabled } = props
  // Form.Item 可以通过 dependencies 属性，设置关联字段。
  // 当关联字段的值发生变化时，会触发校验与更新。
  const [form] = Form.useForm()

  // 监听 text isCenter 变化
  useEffect(() => {
    // 设置新的值
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])

  // 表单数据改变触发该事件
  function handleValueChange() {
    onChange && onChange(form.getFieldsValue())
  }

  return (
    <Form
      form={form}
      name="dependencies"
      layout="vertical"
      initialValues={{ text, isCenter }}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[
          { required: true, message: '请输入段落内容' },
        ]}
      >
        <TextArea autoSize={{ minRows: 5, maxRows: 15 }} />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
