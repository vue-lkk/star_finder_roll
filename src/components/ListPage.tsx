import React, { FC, useEffect, useState } from 'react'
import { Pagination } from 'antd'
// 常量
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY, LIST_PAGE_SIZE } from '../constant'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type PropType = {
  total: number
}

const ListPage: FC<PropType> = (props: PropType) => {
  const { total } = props
  // 当前页
  const [current, setCurrent] = useState(3)
  // 每页长度
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)

  // 从 url 参数中找到 page pageSize，并且同步到 Pagination 组件中
  const [searchParams] = useSearchParams()
  useEffect(() => {
    // 当前页
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    // 每页长度
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
    setCurrent(page)
    setPageSize(pageSize)
  }, [searchParams])

  // 当 page pageSize 改变时， 跳转页面（改变 url 参数）
  const navigate = useNavigate()
  const { pathname } = useLocation()
  function handlePageChange(page: number, pageSize: number) {
    // 设置为新的
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())

    navigate({
      pathname,
      search: searchParams.toString(), //除了改变 page pageSize 之外，其他的url参数要带着
    })
  }

  return (
    <div>
      <Pagination
        align="center"
        pageSize={pageSize}
        current={current}
        total={total}
        onChange={handlePageChange}
      />
    </div>
  )
}

export default ListPage
