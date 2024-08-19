import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
// 引入组件的props类型
import { ComponentPropsType } from '../../components/QuestionComponets'
import { produce } from 'immer'
import {
  getNextSelectedId,
  insertNewComponent,
} from './utils'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'

// 后端单个问卷接口返回的componentList数据中每一项的类型
export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentStateType = {
  // 组件id判断选中类型
  selectedId: string
  // 请求后端单个问卷接口：返回的componentList数组类型
  componentList: ComponentInfoType[]
  // 复制的组件
  copyComponent: ComponentInfoType | null
}

// 设置componentList的默认值为空数组
const INIT_STATE: ComponentStateType = {
  selectedId: '',
  componentList: [],
  copyComponent: null,
}

export const componentSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (
      state: ComponentStateType,
      action: PayloadAction<ComponentStateType>
    ) => {
      return action.payload
    },

    // 修改selectedId 【利用immer来改变react state 不可变数据的写法】
    changeSelectedId: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<string>
      ) => {
        draft.selectedId = action.payload
      }
    ),

    // 添加新组件
    addComponent: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<ComponentInfoType>
      ) => {
        insertNewComponent(draft, action.payload)
      }
    ),

    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{
          fe_id: string
          newProps: ComponentPropsType
        }>
      ) => {
        const { fe_id, newProps } = action.payload
        // 找到当前需要修改属性的组件
        const curComp = draft.componentList.find(
          c => c.fe_id === fe_id
        )
        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps,
          }
        }
      }
    ),

    // 删除选中的组件
    removeSelectedComponent: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{
          fe_id: string
        }>
      ) => {
        const { componentList, selectedId } = draft
        // 先判断是否选中组件
        if (selectedId == '') return
        const { fe_id } = action.payload
        const index = componentList.findIndex(
          c => c.fe_id === fe_id
        )
        // 重新计算selectedId
        const newSelectedId = getNextSelectedId(
          selectedId,
          componentList
        )
        draft.selectedId = newSelectedId as string
        // 删除操作
        componentList.splice(index, 1)
      }
    ),

    // 隐藏/显示 组件
    changeComponentHidden: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{
          fe_id: string
          isHidden: boolean
        }>
      ) => {
        // 解构store中数据
        const { componentList, selectedId } = draft
        // 先判断是否选中组件
        if (selectedId == '') return
        // 解构传递过来的数据
        const { fe_id, isHidden } = action.payload
        // 重新计算selectedId
        let newSelectedId = ''
        if (isHidden) {
          // 要隐藏
          newSelectedId = getNextSelectedId(
            selectedId,
            componentList
          ) as string
        } else {
          // 要显示
          newSelectedId = fe_id
        }
        // 修改selectedId
        draft.selectedId = newSelectedId
        // 获取到选中的组件
        const curComp = componentList.find(
          c => c.fe_id === fe_id
        )
        if (curComp) {
          curComp.isHidden = isHidden
        }
      }
    ),

    // 锁定/解锁
    toggleComponentLocked: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ fe_id: string }>
      ) => {
        const { componentList } = draft
        const { fe_id } = action.payload
        // 获取到选中的组件
        const curComp = componentList.find(
          c => c.fe_id === fe_id
        )
        if (curComp) {
          curComp.isLocked = !curComp.isLocked
        }
      }
    ),

    // 拷贝当前选中的组件
    coypSelectedComponent: produce(
      (draft: ComponentStateType) => {
        const { selectedId, componentList } = draft
        const selectedComponent = componentList.find(
          c => c.fe_id === selectedId
        )
        console.log('@', selectedComponent)
        if (selectedComponent == null) return
        // 深拷贝组件
        draft.copyComponent = cloneDeep(selectedComponent)
      }
    ),

    // 粘贴当前选中的组件
    pasteCopyComponent: produce(
      (draft: ComponentStateType) => {
        const { copyComponent, selectedId, componentList } =
          draft
        if (copyComponent == null) return
        // 粘贴之前，要把fe_id修改了
        copyComponent.fe_id = nanoid()

        // 插入到 componentList
        insertNewComponent(draft, copyComponent)
      }
    ),

    // 选中上一个组件
    selectPrevCompoent: produce(
      (draft: ComponentStateType) => {
        const { selectedId, componentList } = draft
        const selectedIndex = componentList.findIndex(
          c => c.fe_id === selectedId
        )
        if (selectedIndex < 0) return //未选中组件
        if (selectedIndex <= 0) return //已经选中第一个,无法再向上选中
        draft.selectedId =
          componentList[selectedIndex - 1].fe_id
      }
    ),

    // 选中下一个组件
    selectNextCompoent: produce(
      (draft: ComponentStateType) => {
        const { selectedId, componentList } = draft
        const selectedIndex = componentList.findIndex(
          c => c.fe_id === selectedId
        )
        if (selectedIndex < 0) return //未选中组件
        if (selectedIndex === componentList.length - 1)
          return //已经选中最后一个,无法再向下选中
        draft.selectedId =
          componentList[selectedIndex + 1].fe_id
      }
    ),

    // 修改组件标题
    changeComponentTitle: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{
          fe_id: string
          title: string
        }>
      ) => {
        const { componentList } = draft
        const { fe_id, title } = action.payload
        const curComp = componentList.find(
          c => c.fe_id === fe_id
        )
        if (curComp) curComp.title = title
      }
    ),

    // 拖拽移动组件位置
    moveComponent: produce(
      (
        draft: ComponentStateType,
        // 注意这里是类型，不是对象，不能使用","
        action: PayloadAction<{
          oldIndex: number
          newIndex: number
        }>
      ) => {
        const { componentList: curComponentList } = draft
        const { oldIndex, newIndex } = action.payload
        // 利用第三方拖拽库'@dnd-kit/sortable'提供的方法arrayMove 实现移动
        draft.componentList = arrayMove(
          curComponentList,
          oldIndex,
          newIndex
        )
      }
    ),
  },
})

// 暴露actions
export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  coypSelectedComponent,
  pasteCopyComponent,
  selectPrevCompoent,
  selectNextCompoent,
  changeComponentTitle,
  moveComponent,
} = componentSlice.actions
// 暴露reducer
export default componentSlice.reducer
