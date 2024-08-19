import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Logo.module.scss'
// 组件
import { Space, Typography } from 'antd'
const { Title } = Typography
// 图标
import { FormOutlined } from '@ant-design/icons'
import useGetUserInfo from '../hooks/useGetUserInfo'

const Logo: FC = () => {
  const { username } = useGetUserInfo()
  const [pathname, setPathname] = useState('/')
  useEffect(() => {
    if (username) {
      setPathname('/manage/list') // 我的问卷
    }
  }, [username])

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>星问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
