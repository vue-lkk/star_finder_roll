import React, { FC } from 'react'
import { Space, Typography, Button, Form, Input, message } from 'antd'
import styles from './register.module.scss'
import { UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { registerService } from '../services/user'
const { Title } = Typography

const Register: FC = () => {
  const navigate = useNavigate()
  const { run } = useRequest(
    async values => {
      const { username, password, nickname } = values
      await registerService(username, password, nickname)
    },
    {
      manual: true,
      onSuccess() {
        message.success('注册成功')
        navigate('/login')
      },
    }
  )

  // 提交表单且数据验证成功后回调事件
  const onFinish = (values: any) => {
    console.log(values)
    run(values)
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Space>
          <Title>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册用户</Title>
        </Space>
      </div>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名称!' },
              { type: 'string', min: 5, max: 20, message: '字符长度在 5~20 之间!' },
              { pattern: /^\w+$/, message: '只能是字母、数字、下划线' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次密码不一致!'))
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to="/login">已有账户,登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
