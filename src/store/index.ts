import { configureStore } from '@reduxjs/toolkit'
// 导入userReducer 用户信息
import userReducer, { UserStateType } from './userReducer'
// 导入componentReducer 组件属性
import componentsReducer, {
  ComponentStateType,
} from './componentsReducer'
// 导入componentReducer 页面设置
import pageInfoReducer, {
  PageInfoStateType,
} from './componentsReducer/pageInfoReducer'

// 引入撤销重做 redux-undo 库
import undoable, {
  excludeAction,
  StateWithHistory,
} from 'redux-undo'

// 暴露模块类型
export type StateType = {
  user: UserStateType
  components: StateWithHistory<ComponentStateType>
  pageInfo: PageInfoStateType
}

export default configureStore({
  reducer: {
    // 分模块
    user: userReducer,
    // 没有 undo
    // components: componentsReducer,
    // 增加了undo
    components: undoable(componentsReducer, {
      // 限制只能撤销 20 步
      limit: 20,
      // 屏蔽某些 action ，不进行 undo redo
      filter: excludeAction([
        'todoList/resetComponents', // 重置所有组件
        'todoList/changeSelectedId', // 修改selectedId
        'todoList/selectPrevCompoent', // 选中上一个组件
        'todoList/selectNextCompoent', // 选中下一个组件
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
})
