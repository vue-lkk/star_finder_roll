import React, { FC } from 'react'
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Image,
} from 'antd'
import { QuestionCarouselPropsType } from './interface'

const PropComponent: FC<QuestionCarouselPropsType> = (
  props: QuestionCarouselPropsType
) => {
  const {
    height,
    width,
    autoplay,
    srcArr,
    onChange,
    disabled,
  } = props

  // Form.Item 可以通过 dependencies 属性，设置关联字段。
  // 当关联字段的值发生变化时，会触发校验与更新。
  const [form] = Form.useForm()

  // 表单数据改变触发该事件
  function handleValueChange() {
    // 修改 redux store
    onChange && onChange(form.getFieldsValue())
  }

  return (
    <Form
      form={form}
      name="dependencies"
      layout="vertical"
      initialValues={{ height, width, autoplay, srcArr }}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item label="修改图片路径" name="src">
        <Input />
      </Form.Item>
      <Form.Item label="图片宽度" name="width">
        <InputNumber min={50} max={500} changeOnWheel />
      </Form.Item>
      <Form.Item label="图片高度" name="height">
        <InputNumber min={50} max={500} changeOnWheel />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
