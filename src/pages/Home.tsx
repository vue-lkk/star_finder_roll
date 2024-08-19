import React, { FC, useEffect } from 'react'
import { Typography, Button } from 'antd'
const { Title, Paragraph } = Typography
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.scss'
import axios from 'axios'

const Home: FC = () => {
  const naviagte = useNavigate()

  useEffect(() => {
    axios.get('/api/test').then(res => {
      console.log(res)
    })
  })

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到问卷 980 份</Paragraph>
        <div>
          <Button type="primary" onClick={() => naviagte('/manage/list')}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
