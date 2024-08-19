import React, { FC } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type PropsType = {
  id: string
  children: JSX.Element
}

const SortableItem: FC<PropsType> = ({ id, children }) => {
  // 第三方库hook
  const {
    attributes, // 属性
    listeners, // 监听的事件
    setNodeRef, // 设置节点Ref
    transform, // css变换
    transition, // css过渡
  } = useSortable({ id }) // 根据id

  // 样式
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {/* 图层 或者 画布 */}
      {children}
    </div>
  )
}

export default SortableItem
