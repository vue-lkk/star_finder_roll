import React, { FC } from 'react'
// 引入第三方插件
import {
  DndContext, // dnd上下文
  closestCenter, // 冲突检测
  MouseSensor, // 鼠标传感器
  useSensor, // 使用传感器
  useSensors, // 传感器
  DragEndEvent, // 拖动结束事件类型
} from '@dnd-kit/core'

// 引入第三方插件
import {
  SortableContext, // 排序上下文
  verticalListSortingStrategy, // 垂直列表的排序
} from '@dnd-kit/sortable'

// props 类型
type PropsType = {
  // 1. 因为画布和图层渲染项是不一样的，所以需要利用到插槽
  children: JSX.Element | JSX.Element[] // props children 类似Vue中插槽
  // 2. 因为画布和图层的数据解构也不一样，统一处理类型，并且需要传入
  items: Array<{ id: string; [key: string]: any }>
  // 3. 传递新的index和旧的index传递给父组件
  onDragEnd: (oldIndex: number, newIndex: number) => void
}

// 拖拽容器组件
const SortableContainer: FC<PropsType> = (
  props: PropsType
) => {
  const { children, items, onDragEnd } = props

  // 第三方检测器hook
  const sensors = useSensors(
    // 检测：鼠标行为
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, // 小于8px不会触发拖拽
      },
    })
  )

  // 拖拽结束事件
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over == null) return

    if (active.id !== over.id) {
      // 拿到旧的index
      const oldIndex = items.findIndex(
        c => c.fe_id === active.id
      )
      // 拿到新的index
      const newIndex = items.findIndex(
        c => c.fe_id === over.id
      )
      // 传递数据给父组件
      onDragEnd(oldIndex, newIndex)
    }
  }

  return (
    <DndContext
      sensors={sensors} // 检测器
      collisionDetection={closestCenter} // 冲突检测
      onDragEnd={handleDragEnd} // 拖拽结束事件
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy} //垂直列表的排序
      >
        {/* <SortableItem /> 组件*/}
        {children}
      </SortableContext>
    </DndContext>
  )
}

export default SortableContainer
