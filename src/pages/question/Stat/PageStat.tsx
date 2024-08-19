import React, { FC, useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { getQuestionStatListService } from '../../../services/stat'
import { useParams } from 'react-router-dom'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { Typography, Spin, Table, Pagination } from 'antd'
import { STAT_PAGE_SIZE } from '../../../constant'
const { Title } = Typography

type PropsType = {
  selectedComponentId: string // 选中的id
  setSelectedComponentId: (id: string) => void // 修改选中的id
  selectedComponentType: string // 选中的组件类型
  setSelectedComponentType: (type: string) => void // 修改选中的组件类型
}

const PageStat: FC<PropsType> = ({
  selectedComponentId,
  selectedComponentType,
  setSelectedComponentId,
  setSelectedComponentType,
}) => {
  // 获取问卷id
  const { id = '' } = useParams()
  // 总数
  const [total, setTotal] = useState(0)
  // 统计列表
  const [list, setList] = useState([])
  // 当前页
  const [page, setPage] = useState(1)
  // 每页长度
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)

  // 请求
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, {
        page,
        pageSize,
      })
      return res
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { total, list = [] } = res
        setTotal(total)
        setList(list)
        console.log(res)
      },
    }
  )

  // 获取组件列表
  const { componentList } = useGetComponentInfo()

  // 构造table的列
  const columns = componentList.map((c, index) => {
    const { fe_id, title, props = {}, type } = c
    // 优先取 props.title 作为列, !代表不要检查
    const colTitle = props!.title || props!.text || title
    if (index === 0) {
      return {
        onCell: (_: any, index: any) => ({
          rowSpan: index === 0 ? pageSize : 0,
        }),
        title: (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setSelectedComponentId(fe_id)
              setSelectedComponentType(type)
            }}
          >
            {fe_id === selectedComponentId ? (
              <span style={{ color: '#1890ff' }}>
                {colTitle}
              </span>
            ) : (
              <span>{colTitle}</span>
            )}
          </div>
        ),
        dataIndex: fe_id,
      }
    } else {
      return {
        title: (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setSelectedComponentId(fe_id)
              setSelectedComponentType(type)
            }}
          >
            {fe_id === selectedComponentId ? (
              <span style={{ color: '#1890ff' }}>
                {colTitle}
              </span>
            ) : (
              <span>{colTitle}</span>
            )}
          </div>
        ),
        dataIndex: fe_id,
      }
    }
  })

  // 构造table的行【list 统计列表缺少key】
  const rows = list.map((i: any) => ({
    ...i,
    key: i._id,
  }))

  // 表格
  const TableElem = (
    <>
      <Table
        dataSource={rows}
        columns={columns}
        pagination={false}
        bordered
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      >
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={page => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          }}
        />
      </div>
    </>
  )

  return (
    <div>
      <Title level={3}>答卷数量：{!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && TableElem}
    </div>
  )
}

export default PageStat
