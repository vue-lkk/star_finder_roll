import React, { FC, MouseEvent } from 'react'
import styles from './StatCanvas.module.scss'
import { Spin } from 'antd'
// 获取redux stroe 中的单个问卷的组件列表数据
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
// 引入根据类型返回组件的函数
import { getComponentConfigByType } from '../../../components/QuestionComponets'
import classNames from 'classnames'
import { ComponentInfoType } from '../../../store/componentsReducer'

type PropsType = {
  isLoading: boolean
  selectedComponentId: string // 选中的id
  setSelectedComponentId: (id: string) => void // 修改选中的id
  selectedComponentType: string // 选中的组件类型
  setSelectedComponentType: (type: string) => void // 修改选中的组件类型
}

// 函数：放到组件外面组件更新时，不会重新创建
function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  // 根据type获取组件的配置
  const componentConfig = getComponentConfigByType(type)
  if (componentConfig == null) return
  const { Component } = componentConfig
  // 返回对应的组件和传递props
  return <Component {...props} />
}

const StatCanvas: FC<PropsType> = ({
  isLoading,
  selectedComponentId,
  selectedComponentType,
  setSelectedComponentId,
  setSelectedComponentType,
}) => {
  // 获取到store 中的componentList
  const { componentList } = useGetComponentInfo()

  // 点击修改selectedId 和 type
  function handleClick(
    event: MouseEvent,
    id: string,
    type: string
  ) {
    console.log(id, type)
    event.stopPropagation() // 阻止事件冒泡
    setSelectedComponentId(id) // 修改选中的id
    setSelectedComponentType(type) // 修改选中的type
  }

  if (isLoading) {
    return (
      <div
        style={{ textAlign: 'center', marginTop: '24px' }}
      >
        <Spin></Spin>
      </div>
    )
  }

  return (
    <div className={styles.canvas}>
      {componentList
        .filter(c => !c.isHidden) // 过滤隐藏的组件
        .map(c => {
          const { fe_id, type } = c

          // 拼接classname
          const wrapperDefaultClassName =
            styles['component-wrapper']
          const selectedClassName = styles.selected
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]:
              selectedComponentId === fe_id ? true : false,
          })

          return (
            <div
              key={c.fe_id}
              className={wrapperClassName}
              onClick={e => handleClick(e, fe_id, type)}
            >
              <div className={styles.component}>
                {genComponent(c)}
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default StatCanvas
