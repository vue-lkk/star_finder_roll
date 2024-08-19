import React, { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
// 获取redux stroe 中的单个问卷的组件列表数据
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
// 引入根据类型返回组件的函数
import { getComponentConfigByType } from '../../../components/QuestionComponets'
import classNames from 'classnames'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponent,
} from '../../../store/componentsReducer'
import { useDispatch, useSelector } from 'react-redux'

// 拖拽
import SortableContainer from '../../../components/DargSortable/SortableContainer'
import SortableItem from '../../../components/DargSortable/SortableItem'

type PropsType = {
  isLoading: boolean
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

const EditCanvas: FC<PropsType> = ({ isLoading }) => {
  // 获取到store 中的componentList 和 selectedId
  const { componentList, selectedId } =
    useGetComponentInfo()
  // 获取dispatch
  const dispatch = useDispatch()

  // 点击修改selectedId
  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation() // 阻止事件冒泡
    dispatch(changeSelectedId(id))
  }

  // 绑定快捷键
  useBindCanvasKeyPress()

  if (isLoading) {
    return (
      <div
        style={{ textAlign: 'center', marginTop: '24px' }}
      >
        <Spin></Spin>
      </div>
    )
  }

  // 因为上面componentList数据列表缺少id字段，需要构造
  const componentListWithId = componentList.map(c => {
    return {
      ...c,
      id: c.fe_id,
    }
  })

  // 拖拽结束：获取到子组件返回拖拽项的 新索引值 和 旧索引值
  function handleDragEnd(
    oldIndex: number,
    newIndex: number
  ) {
    console.log(oldIndex, newIndex)
    // 修改redux store 的componentList 顺序
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer
      items={componentListWithId}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.canvas}>
        {componentList
          .filter(c => !c.isHidden)
          .map(c => {
            const { fe_id, isLocked } = c
            // 拼接classname
            const wrapperDefaultClassName =
              styles['component-wrapper']
            const selectedClassName = styles.selected
            const lockedClassName = styles.locked
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]:
                selectedId === fe_id ? true : false,
              [lockedClassName]: isLocked,
            })

            return (
              <SortableItem key={fe_id} id={c.fe_id}>
                <div
                  className={wrapperClassName}
                  onClick={e => handleClick(e, fe_id)}
                >
                  <div className={styles.component}>
                    {genComponent(c)}
                  </div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
