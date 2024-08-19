import React, { FC, useState } from 'react'
import { Spin, Result, Button } from 'antd'
import { useSetState, useTitle } from 'ahooks'
// 引入hooks
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import StatHeader from './StatHeader'
import EditCanvas from './StatCanvas'
import PageStat from './PageStat'
import ChartStat from './ChartStat'

const Stat: FC = () => {
  const { loading } = useLoadQuestionData()
  const { title, isPublished } = useGetPageInfo()
  // 修改标题
  useTitle(`问卷统计-${title}`)
  const navigate = useNavigate()

  // 状态提升 selectedId type
  const [selectedComponentId, setSelectedComponentId] =
    useState('')
  const [selectedComponentType, setSelectedComponentType] =
    useState('')

  // loading效果
  const LoadingElem = (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin />
    </div>
  )

  function genContentElem() {
    // 判断问卷是否发布
    if (typeof isPublished === 'boolean' && isPublished) {
      return (
        <div>
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button
                type="primary"
                onClick={() => {
                  navigate(-1)
                }}
              >
                返回
              </Button>
            }
          ></Result>
        </div>
      )
    }

    return (
      <>
        {/* 左边 */}
        <div className={styles.left}>
          <EditCanvas
            isLoading={loading}
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            selectedComponentType={selectedComponentType}
            setSelectedComponentType={
              setSelectedComponentType
            }
          />
        </div>
        {/* 中间 */}
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            selectedComponentType={selectedComponentType}
            setSelectedComponentType={
              setSelectedComponentType
            }
          />
        </div>
        {/* 右侧 */}
        <div className={styles.right}>
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <div>
        <StatHeader />
      </div>

      <div className={styles['content-wrapper']}>
        {/* loading效果 */}
        {loading && LoadingElem}
        {/* 内容 */}
        {!loading && (
          <div className={styles.content}>
            {genContentElem()}
          </div>
        )}
      </div>
    </div>
  )
}

export default Stat
