import React, { FC, useEffect, useState } from 'react'
import { Typography } from 'antd'
const { Title } = Typography

import { useRequest } from 'ahooks'
import { getComonentStatService } from '../../../services/stat'
import { useParams } from 'react-router-dom'
// 获取对应的组件的配置
import { getComponentConfigByType } from '../../../components/QuestionComponets'

type PropsType = {
  selectedComponentId: string // 选中的id
  selectedComponentType: string // 选中的组件类型
}

const ChartStat: FC<PropsType> = ({
  selectedComponentId, // 组件id
  selectedComponentType,
}) => {
  // 获取问卷id
  const { id = '' } = useParams()
  const [stat, setStat] = useState([])

  // 获取组件统计数据汇总数据
  const { loading, run } = useRequest(
    async (questionId, componentId) =>
      await getComonentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        console.log(res)
        setStat(res.stat)
      },
    }
  )

  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId)
  }, [id, selectedComponentId])

  // 生成统计图表
  function genStatElem() {
    if (!selectedComponentId) return <div>未选择组件</div>
    const { StatComponent } =
      getComponentConfigByType(selectedComponentType) || {}
    if (StatComponent == null)
      return <div>该组件无统计表</div>
    return <StatComponent stat={stat} />
  }

  return (
    <>
      <Title level={3}>图表统计</Title>
      <div style={{ width: '400px', height: '300px' }}>
        {genStatElem()}
      </div>
    </>
  )
}

export default ChartStat
