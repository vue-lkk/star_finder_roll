import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { produce } from 'immer'

export type PageInfoStateType = {
  title: string // 标题
  desc?: string //描述
  js?: string // javascript脚本
  css?: string // css样式
  isPublished?: boolean // 问卷是否发布
}

// 初始值
const INIT_STATE: PageInfoStateType = {
  title: '',
  desc: '',
  js: '',
  css: '',
  isPublished: false,
}

export const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    // 重置页面设置数据
    resetPageInfo: (
      state: PageInfoStateType,
      action: PayloadAction<PageInfoStateType>
    ) => {
      return action.payload
    },

    // 修改问卷标题
    changePageTitle: produce(
      (
        draft: PageInfoStateType,
        action: PayloadAction<string>
      ) => {
        draft.title = action.payload
      }
    ),
  },
})

// 暴露actions
export const { resetPageInfo, changePageTitle } =
  pageInfoSlice.actions
// 暴露reducer
export default pageInfoSlice.reducer
