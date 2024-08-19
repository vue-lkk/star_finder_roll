import React, { FC, useEffect } from 'react'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/componentsReducer/pageInfoReducer'

const PageSetting: FC = () => {
  const dispatch = useDispatch()
  const pageInfo = useGetPageInfo()
  const [form] = Form.useForm()

  // 实时更新表单内容
  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()))
    console.log(form.getFieldsValue())
  }
  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder="问卷描述..." />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="请输入 样式代码..." />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="请输入 脚本代码..." />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
