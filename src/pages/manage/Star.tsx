import React, { FC } from 'react'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { useTitle } from 'ahooks'
import ListSearch from '../../components/ListSearch'
// 引入hooks
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { Typography, Empty, Spin, Pagination } from 'antd'
import ListPage from '../../components/ListPage'
const { Title } = Typography

// 问卷列表数据
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
// ]

const Star: FC = () => {
  useTitle('星问卷-星标问卷')
  // 手写的问卷列表数据
  // const [questionList, setQuestionList] = useState(rawQuestionList)

  // 获取到后端mock模拟的数据
  const { data = {}, loading } = useLoadQuestionListData({
    isStar: true,
  })
  const { list = [], total = 0 } = data

  return (
    <>
      {/* 头部 */}
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          {/* 搜索 */}
          <ListSearch />
        </div>
      </div>

      {/* 内容 */}
      <div className={styles['content_star']}>
        {/* 加载... */}
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}

        {/* 星标列表 */}
        {!loading &&
          list.length > 0 &&
          list
            .filter((q: any) => q.isStar === true)
            .map((q: any) => {
              const { _id } = q
              return <QuestionCard key={_id} {...q} />
            })}

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

export default Star
