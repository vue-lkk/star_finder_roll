import React, { FC, useRef, useState } from 'react'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { useRequest, useTitle } from 'ahooks'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import {
  Typography,
  Empty,
  Table,
  Tag,
  Space,
  Button,
  Divider,
  Modal,
  Spin,
  message,
} from 'antd'
import ListPage from '../../components/ListPage'
import {
  deletedQuestionService,
  updateQuestionService,
} from '../../services/question'
const { Title } = Typography
const { confirm } = Modal

// table的行
// const rawQuestionList = [
//   {
//     _id: 'q1', // mongodb 数据库 _id
//     title: '问卷1',
//     isPublished: false,
//     isStar: false,
//     answerCount: 5,
//     createdAt: '3月10日 10:30',
//   },
//   {
//     _id: 'q2',
//     title: '问卷2',
//     isPublished: true,
//     isStar: false,
//     answerCount: 3,
//     createdAt: '3月11日 12:30',
//   },
//   {
//     _id: 'q3',
//     title: '问卷3',
//     isPublished: false,
//     isStar: true,
//     answerCount: 13,
//     createdAt: '3月8日 21:30',
//   },
//   {
//     _id: 'q4',
//     title: '问卷4',
//     isPublished: false,
//     isStar: true,
//     answerCount: 7,
//     createdAt: '3月9日 9:30',
//   },
//   // {
//   //   _id: 'q5',
//   //   title: '问卷5',
//   //   isPublished: true,
//   //   isStar: false,
//   //   answerCount: 5,
//   //   createdAt: '3月13日 10:32',
//   // },
// ]

// table的列
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    // key: 'title', // 循环列的key，它默认取dataIndex 的值
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    render: (isPublished: boolean) => {
      return isPublished ? (
        <Tag color="#87d068">已发布</Tag>
      ) : (
        <Tag>未发布</Tag>
      )
    },
  },
  {
    title: '答卷',
    dataIndex: 'answerCount',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
  },
]

const Trash: FC = () => {
  useTitle('星问卷-回收站')
  // 数据
  // const [questionList, setQuestionList] = useState(rawQuestionList)

  // 获取到后端mock模拟的数据
  const {
    data = {},
    loading,
    refresh,
  } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data

  // 选择框类型
  const [selectionType, setSelectionType] = useState<
    'checkbox' | 'radio'
  >('checkbox')
  // 收集选中的_id数组
  const [selectedIds, setSelectedIds] = useState<string[]>(
    []
  )
  console.log('id数组', selectedIds)

  // 删除
  const { loading: deletedLoading, run: deleteQuestion } =
    useRequest(
      async () => await deletedQuestionService(selectedIds),
      {
        manual: true,
        onSuccess() {
          message.success('彻底删除成功')
          refresh() // 手动刷新列表
          setSelectedIds([]) // 清空id数组
        },
      }
    )

  function del() {
    confirm({
      title: '是否确定彻底删除问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后不可找回',
      onOk: deleteQuestion,
      okText: '确定',
      cancelText: '取消',
    })
  }

  // 恢复
  const { loading: recoverLoading, run: recover } =
    useRequest(
      async () => {
        for await (const id of selectedIds) {
          await updateQuestionService(id, {
            isDeleted: false,
          })
        }
      },
      {
        manual: true,
        debounceWait: 500, // 防抖
        onSuccess() {
          message.success('恢复成功')
          refresh() // 手动刷新列表
          setSelectedIds([]) // 清空id数组
        },
      }
    )

  return (
    <>
      {/* 头部 */}
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          {/* 搜索 */}
          <ListSearch />
        </div>
      </div>

      <div style={{ marginBottom: '5px' }}>
        <Space>
          <Button
            type="primary"
            disabled={selectedIds.length === 0}
            onClick={recover}
          >
            恢复
          </Button>
          <Button
            danger
            disabled={selectedIds.length === 0}
            onClick={del}
          >
            {selectedIds.length <= 1
              ? '彻底删除'
              : '批量彻底删除'}
          </Button>
        </Space>
      </div>

      {/* 内容 */}
      <div className={styles['content_trash']}>
        {/* 加载... */}
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}

        {/* 回收站表格 */}

        {!loading && list.length > 0 && (
          <>
            <Table
              dataSource={list}
              columns={columns}
              pagination={false}
              rowKey={q => q._id}
              scroll={{ y: 530 }}
              rowSelection={{
                type: selectionType,
                onChange: (
                  selectedRowKeys,
                  selectedRows
                ) => {
                  console.log(selectedRowKeys, selectedRows)
                  setSelectedIds(
                    selectedRowKeys as string[]
                  )
                },
              }}
            />
          </>
        )}

        {/* Empty空状态 */}
        {!loading && list.length === 0 && (
          <Empty description="暂无数据" />
        )}
      </div>
      {/* 底部 */}
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash
