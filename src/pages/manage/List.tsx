import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import ListSearch from '../../components/ListSearch'
import { Typography, Empty, Spin } from 'antd'
import { UpSquareOutlined } from '@ant-design/icons'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../../services/question'
import { LIST_SEARCH_PARAM_KEY, LIST_PAGE_SIZE } from '../../constant'
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
//   {
//     _id: 'q5',
//     title: '问卷5',
//     isPublished: true,
//     isStar: false,
//     answerCount: 5,
//     createdAt: '3月13日 10:32',
//   },
//   {
//     _id: 'q6',
//     title: '问卷6',
//     isPublished: true,
//     isStar: false,
//     answerCount: 5,
//     createdAt: '3月13日 10:32',
//   },
//   {
//     _id: 'q7',
//     title: '问卷7',
//     isPublished: true,
//     isStar: false,
//     answerCount: 5,
//     createdAt: '3月13日 10:32',
//   },
// ]

const List: FC = () => {
  useTitle('星问卷-我的问卷')
  // window.document.title = '星问卷-我的问卷'

  // url 参数，虽然没有page pageSize,但是有 keyword
  const [searchParams] = useSearchParams()
  // 当前页
  const [page, setPage] = useState(1)
  // 问卷数据列表
  const [list, setList] = useState([])
  // 总数量
  const [total, setTotal] = useState(0)
  // 是否已经开始加载（防抖，有延迟时间）
  const [started, setStarted] = useState(false)
  // 搜索关键字
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  const [scrollTop, setScrollTop] = useState(0)

  // 利用ahooks的useRequest,获取到后端mock模拟的数据
  const { run: load, loading } = useRequest(
    async () => {
      // 请求接口
      const data = await getQuestionListService({
        keyword,
        page,
        pageSize: LIST_PAGE_SIZE,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l)) // 累计数据
        setTotal(total) // 总数量
        setPage(page + 1) // 页面
      },
    }
  )

  // 获取"下拉加载更多"DOM
  const containerRef = useRef<HTMLDivElement>(null)
  // 触发加载更多,防抖
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current || null
      if (elem == null) return
      // 获取元素的位置
      const domRect = elem.getBoundingClientRect()
      // 拿到'上拉加载更多'元素的底部 距离 列表盒子顶部的距离
      const { bottom } = domRect
      // 列表盒子的可视区高度
      const listBoxHeight = (listBox.current as HTMLDivElement).clientHeight
      const listBoxTop = (listBox.current as HTMLDivElement).scrollTop
      console.log(domRect, bottom, listBoxHeight, listBoxTop)
      setScrollTop(listBoxTop)
      // 滚动到底部时 bottom是736 ,listBoxHeight 是固定的572
      // 使用可以算出差值 = 736 - 572 = 164
      if (bottom - 164 <= listBoxHeight) {
        load() // 真正加载数据
        setStarted(true)
      }
    },
    {
      wait: 500,
    }
  )

  // 当页面加载或url参数（keyword）变化时，触发加载
  // keyword变化时，重置信息
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
    load()
  }, [keyword]) // 依赖项

  // 获取问卷列表盒子DOM
  const listBox = useRef<HTMLDivElement>(null)
  // 当页面滚动时，尝试触发加载
  useEffect(() => {
    // 判断上拉加载完毕
    console.log(total, list.length)
    if (total >= list.length) {
      listBox.current && listBox.current.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      listBox.current && listBox.current.removeEventListener('scroll', tryLoadMore) // 解绑
    }
  }, [page])

  const LoadMoreContentEle = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!(total >= list.length)) return <span>到底啦！</span>
    return <span>上拉加载更多</span>
  }, [started, loading, total])

  return (
    <>
      {/* 头部 */}
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          {/* 搜索 */}
          <ListSearch />
        </div>
      </div>

      {/* 内容 */}
      <div className={styles.content} ref={listBox}>
        {/* 问卷列表 */}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}

        {/* 底部 */}
        <div className={styles.footer}>
          <div ref={containerRef}>{LoadMoreContentEle}</div>
        </div>

        {/* 回到顶部 */}
        <div
          className={styles.scrolltop}
          onClick={() => ((listBox.current as HTMLDivElement).scrollTop = 0)}
        >
          {scrollTop > 1000 ? <UpSquareOutlined style={{ fontSize: 30, color: 'bule' }} /> : null}
        </div>
      </div>
    </>
  )
}

export default List
