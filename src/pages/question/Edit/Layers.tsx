import React, { ChangeEvent, FC, useState } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { Button, Space, Input, message } from 'antd'
import {
  EyeInvisibleOutlined,
  LockOutlined,
} from '@ant-design/icons'

import styles from './Layers.module.scss'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  moveComponent,
  toggleComponentLocked,
} from '../../../store/componentsReducer'

// 拖拽
import SortableContainer from '../../../components/DargSortable/SortableContainer'
import SortableItem from '../../../components/DargSortable/SortableItem'

const Layers: FC = () => {
  const dispatch = useDispatch()
  const { componentList, selectedId } =
    useGetComponentInfo()

  // 记录当前正在修改标题的组件
  const [changingTilteId, setChangingTitleId] = useState('')

  // 点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(
      c => c.fe_id === fe_id
    )
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }
    if (fe_id !== selectedId) {
      // 当前组件未被选中，执行选中
      dispatch(changeSelectedId(fe_id))
      setChangingTitleId('')
      return
    }
    // 点击切换input修改标题
    setChangingTitleId(fe_id)
  }

  // 修改标题
  function changeTilte(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    if (!selectedId) return
    dispatch(
      changeComponentTitle({
        fe_id: selectedId,
        title: newTitle,
      })
    )
  }

  // 切换 隐藏/显示
  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }

  // 切换 锁定/解锁
  function changeLocked(fe_id: string) {
    dispatch(toggleComponentLocked({ fe_id }))
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
    // 修改redux store 的componentList 顺序
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer
      items={componentListWithId}
      onDragEnd={handleDragEnd}
    >
      {componentList.map(c => {
        const { fe_id, title, isHidden, isLocked } = c
        // 拼接 title className
        const titleDefaultClassName = styles.title
        const selecteClassName = styles.selected
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selecteClassName]: fe_id === selectedId,
        })

        return (
          <SortableItem key={fe_id} id={c.fe_id}>
            {/* 每一项图层盒子 */}
            <div className={styles.wrapper}>
              <div
                className={titleClassName}
                onClick={() => handleTitleClick(fe_id)}
              >
                {/* 输入框 */}
                {fe_id === changingTilteId && (
                  <Input
                    value={title}
                    onPressEnter={() =>
                      setChangingTitleId('')
                    }
                    onBlur={() => setChangingTitleId('')}
                    onChange={changeTilte}
                  />
                )}
                {/* 内容 */}
                {fe_id !== changingTilteId && title}
              </div>
              {/* 图层操作 隐藏/显示 锁定/解锁 */}
              <div className={styles.handler}>
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    icon={<EyeInvisibleOutlined />}
                    className={!isHidden ? styles.btn : ''}
                    type={isHidden ? 'primary' : 'text'}
                    onClick={() =>
                      changeHidden(fe_id, !isHidden)
                    }
                  ></Button>
                  <Button
                    size="small"
                    shape="circle"
                    icon={<LockOutlined />}
                    className={!isLocked ? styles.btn : ''}
                    type={isLocked ? 'primary' : 'text'}
                    onClick={() => changeLocked(fe_id)}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}

export default Layers
