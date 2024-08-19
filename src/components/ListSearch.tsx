import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
// 常量
import { LIST_SEARCH_PARAM_KEY } from '../../src/constant/index'
import { Input } from 'antd'
const { Search } = Input

const ListSearch: FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  // 获取url参数，并设置到input的value
  const [searchParams] = useSearchParams()
  useEffect(() => {
    // 每当searchParams有变化，都会执行这个函数
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  }, [searchParams])

  const [value, setValue] = useState<string>('')
  // 受控组件
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }
  // 搜索事件
  function handleSearch(value: string) {
    // 跳转页面
    navigate({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`, // 去掉了 page pagesSize
    })
  }

  return (
    <div>
      <Search
        size="large"
        placeholder="输入关键字"
        allowClear
        value={value}
        onChange={handleChange}
        onSearch={handleSearch}
        style={{ width: 200 }}
      />
    </div>
  )
}

export default ListSearch
