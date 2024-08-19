import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  coypSelectedComponent,
  pasteCopyComponent,
  removeSelectedComponent,
  selectNextCompoent,
  selectPrevCompoent,
} from '../store/componentsReducer'
import useGetComponentInfo from '../hooks/useGetComponentInfo'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
/**
 * 判断鼠标是否命中属性面板中的输入框【正在修改属性，不可以使用快捷键】
 */
function isActiveElementValid() {
  // 获取鼠标当前焦点的元素
  const activeElem = document.activeElement
  // 判断是否是body元素
  // 没有增加 dnd-kit 之前
  // if (activeElem === document.body) return true

  // 增加了dnd-kit 以后
  if (activeElem === document.body) return true
  // activeElem 中匹配到 div[role="button"]
  if (activeElem?.matches('div[role="button"]')) return true
  return false
}

function useBindCanvasKeyPress() {
  const { selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()

  // 删除组件:快捷键【delete】或【backspace】
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent({ fe_id: selectedId }))
  })

  // 复制组件：快捷键【ctrl+c】苹果【meta.c】
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(coypSelectedComponent())
  })

  // 粘贴组件：快捷键【ctrl+c】苹果【meta.v】
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopyComponent())
  })

  // 选中上一个组件：快捷键【uparrow】
  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevCompoent())
  })

  // 选中下一个组件：快捷键【downarrow】
  useKeyPress(['downarrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextCompoent())
  })

  // 撤销： 快捷键【ctrl.z】 苹果【meta.z】
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(UndoActionCreators.undo())
    },
    {
      exactMatch: true, // 严格匹配
    }
  )

  // 重做: 快捷键【ctrl.shift.z】 苹果【meta.shift.z】
  useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
    if (!isActiveElementValid()) return
    dispatch(UndoActionCreators.redo())
  })
}

export default useBindCanvasKeyPress

// --------------------------------------------------------------------
// 模拟 输入框的 输入、撤销、重做 的过程
// const present = '' // 存储当前输入框的值

// const past = [] // 历史数据的记录

// const future = [] // 未来数据的记录

// ---------------------------------------------------------------------
// 输入：pset -- 入栈【push】   future -- 清空内容
// 撤销：past -- 出栈【pop】    future -- 入栈【push】  present -- 重新赋值
// 重做：future -- 出栈【pop】  past -- 入栈【push】    present -- 重新赋值

// ----------------------------------------------------------------------
// 执行输入：
// 输入a：   present = 'a'    pase=['a']              future = []
// 再次输入b：present = 'ab'   pase=['a','ab']         future = []
// 再次输入c：present = 'abc'  pase=['a','ab','abc']   future = []

// 执行撤销：
// 撤销abc：  pase=['a','ab']  future = ['abc']       present = 'ab'
// 再次撤销ab：pase=['a']      future = ['abc','ab']   present = 'a'

// 执行重做：
// 重做ab：    future = ['abc']  pase=['a','ab']        present = 'ab'
// 再次重做abc: future = []      pase=['a','ab','abc']   present = 'abc'
