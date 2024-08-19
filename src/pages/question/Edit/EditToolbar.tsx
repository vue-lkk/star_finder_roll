import { Space, Button, Tooltip } from 'antd'
import React, { FC } from 'react'
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownCircleOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  coypSelectedComponent,
  pasteCopyComponent,
  moveComponent,
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const {
    selectedId,
    componentList,
    selectedComponent,
    copyComponent,
  } = useGetComponentInfo()
  // 获取到选中的isLocked
  const { isLocked } = selectedComponent || {}

  // 获取到选中的组件索引值
  const selectedIndex = componentList.findIndex(
    c => c.fe_id === selectedId
  )
  // 判断当前选中是第一个
  const isFirst = selectedIndex <= 0 || !selectedId
  // 判断当前选中是最后一个
  const isLast =
    selectedIndex === componentList.length - 1 ||
    !selectedId

  // 删除操作
  function handleDelete() {
    dispatch(
      removeSelectedComponent({
        fe_id: selectedId,
      })
    )
  }

  // 隐藏组件
  function handleHidden() {
    dispatch(
      changeComponentHidden({
        fe_id: selectedId,
        isHidden: true,
      })
    )
  }

  // 锁定组件
  function handleLock() {
    dispatch(
      toggleComponentLocked({
        fe_id: selectedId,
      })
    )
  }

  // 复制组件
  function handleCopy() {
    dispatch(coypSelectedComponent())
  }

  // 粘贴组件
  function handlePaste() {
    dispatch(pasteCopyComponent())
  }

  // 上移组件
  function moveUp() {
    if (isFirst) return
    dispatch(
      moveComponent({
        oldIndex: selectedIndex,
        newIndex: selectedIndex - 1,
      })
    )
  }

  // 下移组件
  function moveDown() {
    if (isLast) return
    dispatch(
      moveComponent({
        oldIndex: selectedIndex,
        newIndex: selectedIndex + 1,
      })
    )
  }

  // 撤销
  function undo() {
    dispatch(UndoActionCreators.undo())
  }

  // 重做
  function redo() {
    dispatch(UndoActionCreators.redo())
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        ></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={handleHidden}
        ></Button>
      </Tooltip>
      <Tooltip title={!isLocked ? '锁定' : '解锁'}>
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button
          shape="circle"
          icon={<CopyOutlined />}
          onClick={handleCopy}
        ></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={copyComponent == null}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button
          shape="circle"
          icon={<UpOutlined />}
          onClick={moveUp}
          disabled={isFirst}
        ></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={moveDown}
          disabled={isLast}
        ></Button>
      </Tooltip>
      <Tooltip title="撤销">
        <Button
          shape="circle"
          icon={<UndoOutlined />}
          onClick={undo}
        ></Button>
      </Tooltip>
      <Tooltip title="重做">
        <Button
          shape="circle"
          icon={<RedoOutlined />}
          onClick={redo}
        ></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
