import React, { FC, useEffect } from 'react'
import { Space, Typography, Button, Form, Input, Checkbox, message } from 'antd'
import styles from './login.module.scss'
import { UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { Value } from 'sass'
import { useRequest } from 'ahooks'
import { loginService } from '../services/user'
import { setToken } from '../utils/user-token'

const { Title } = Typography

const Login: FC = () => {
  // 常量
  const USERNAME_KEY = 'username'
  const PASSWORD_KEY = 'password'

  // 存储用户信息函数
  function remenberUser(username: string, password: string) {
    localStorage.setItem(USERNAME_KEY, username)
    localStorage.setItem(PASSWORD_KEY, password)
  }

  // 删除用户信息函数
  function deleteUserFormStorage() {
    localStorage.removeItem(USERNAME_KEY)
    localStorage.removeItem(PASSWORD_KEY)
  }

  // 获取用户信息函数
  function getUserFormStorage() {
    return {
      username: localStorage.getItem(USERNAME_KEY),
      password: localStorage.getItem(PASSWORD_KEY),
    }
  }
  // 经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建
  const [form] = Form.useForm()

  useEffect(() => {
    const { username, password } = getUserFormStorage()
    form.setFieldsValue({ username, password })
  }, [])

  // 提交表单且数据验证成功后回调事件
  const onFinish = (values: any) => {
    const { username, password, remember } = values
    run(username, password)
    if (remember) {
      console.log('记住')
      remenberUser(username, password)
    } else {
      console.log('忘记')
      deleteUserFormStorage()
    }
  }

  // 登录
  const navigate = useNavigate()
  const { run } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { token } = result
        // 存储token
        setToken(token)
        console.log(result)
        message.success('登录成功')
        navigate('/manage/list') // 导航到我的问卷
      },
    }
  )

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Space>
          <Title>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          form={form}
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

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to="/register">注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
