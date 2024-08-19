import { useRequest } from 'ahooks'
import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUserInfoService } from '../services/user'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { removeToken } from '../utils/user-token'
// 引入获取用户信息的hook
import useGetUserInfo from '../hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
// 引入actions
import { logoutReducer } from '../store/userReducer'

const UserInfo: FC = () => {
  // 获取用户信息
  // const { data } = useRequest(getUserInfoService)
  // const { username, nickname } = data || {}

  const { username, nickname } = useGetUserInfo()
  const dispatch = useDispatch()

  const navigate = useNavigate()
  // 退出登录
  function logout() {
    dispatch(logoutReducer()) // 清空redux user 数据
    removeToken() // 清除 token 的 存储
    message.success('退出成功')
    navigate('/login') // 导航到登录页
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined style={{ fontSize: 20 }} />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出登录
      </Button>
    </>
  )

  const Login = (
    <>
      <Link to="/login">登录</Link>
    </>
  )
  return <>{username ? UserInfo : Login}</>
}

export default UserInfo
