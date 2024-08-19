import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'
// 引入Antd
import { Layout, Spin } from 'antd'
const { Header, Footer, Content } = Layout

// 自定义组件
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)
  return (
    <Layout>
      {/* 头部 */}
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      {/* 内容 */}
      <Layout>
        <Content className={styles.main}>
          {waitingUserData ? (
            <div
              style={{
                textAlign: 'center',
                marginTop: '100px',
              }}
            >
              <Spin />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
      {/* 底部 */}
      <Footer className={styles.footer}>
        星问卷 &copy;2024 - present.Created by LKK
      </Footer>
    </Layout>
  )
}

export default MainLayout
