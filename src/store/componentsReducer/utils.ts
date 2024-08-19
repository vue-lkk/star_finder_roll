import {
  ComponentInfoType,
  ComponentStateType,
} from './index'

/**
 *计算selectedId
 * @param fe_id
 * @param componentList
 * @returns
 */
export function getNextSelectedId(
  fe_id: string,
  componentList: ComponentInfoType[]
) {
  // 筛选掉隐藏的组件
  const fliterComponentList = componentList.filter(
    c => !c.isHidden
  )
  // 获取到选中组件的索引值
  const index = fliterComponentList.findIndex(
    c => c.fe_id === fe_id
  )
  if (index == -1) return

  // 重新计算 selectedId
  let newSelectedId = ''
  const length = fliterComponentList.length
  if (length <= 1) {
    // 组件长度就一个，被删除了，就没有组件
    newSelectedId = ''
  } else {
    // 组件长度 > 1
    if (index + 1 === length) {
      // 要删除最后一个,就要选中上一个
      newSelectedId = fliterComponentList[index - 1].fe_id
    } else {
      // 要删除不是最后一个,就要选中下一个
      newSelectedId = fliterComponentList[index + 1].fe_id
    }
  }

  return newSelectedId
}

/**
 *插入新组件
 * @param draft state draft
 * @param newComponent 新组件
 */
export function insertNewComponent(
  draft: ComponentStateType,
  newComponent: ComponentInfoType
) {
  // 放到当前选中的组件的下面
  const { selectedId, componentList } = draft
  const index = componentList.findIndex(
    c => c.fe_id == selectedId
  )

  if (index == -1) {
    // 未选中任何组件
    draft.componentList.push(newComponent)
  } else {
    draft.componentList.splice(index + 1, 0, newComponent)
  }
  // 修改selectedId 为刚刚添加的组件fe_id
  draft.selectedId = newComponent.fe_id
}
