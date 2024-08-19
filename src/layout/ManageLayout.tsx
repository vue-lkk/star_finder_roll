import React, { FC, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
// 接口
import { createQuestionService } from '../services/question'
// 引入antd图标
import {
  PlusOutlined,
  UnorderedListOutlined,
  StarOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
// 引入antd组件
import { Button, Flex, Divider, message } from 'antd'
import { useRequest } from 'ahooks'

const ManageLayout: FC = () => {
  // 路由
  const naviagte = useNavigate()
  // 获取路由路径
  const { pathname } = useLocation()

  // 正在加载状态，避免连续新建问卷
  // const [loading, setLoading] = useState<boolean>(false)
  // // 新建问卷
  // async function handleCreateClick() {
  //   setLoading(true)
  //   const data = await createQuestionService()
  //   console.log(data)
  //   const { id } = data || {}
  //   if (id) {
  //     naviagte(`/question/edit/${id}`)
  //     message.success('创建成功！')
  //   }
  //   setLoading(false)
  // }

  const { loading, run: handleCreateClick } = useRequest(createQuestionService, {
    manual: true,
    onSuccess: result => {
      const { id } = result
      naviagte(`/question/edit/${id}`)
      message.success('创建成功！')
    },
  })

  return (
    <div className={styles.container}>
      {/* 左侧 */}
      <div className={styles.left}>
        {/* 利用Flex组件包裹实现间隔 */}
        <Flex wrap gap="small">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleCreateClick}
            disabled={loading}
          >
            新建问卷
          </Button>
          {/* 分割线 */}
          <Divider style={{ border: 'none' }} />
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<UnorderedListOutlined />}
            onClick={() => naviagte('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => naviagte('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => naviagte('/manage/trash')}
          >
            回收站
          </Button>
        </Flex>
      </div>
      {/* 右侧 */}
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
