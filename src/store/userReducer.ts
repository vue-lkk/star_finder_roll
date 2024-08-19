import {
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit'

// 暴露用户信息类型
export type UserStateType = {
  username: string
  nickname: string
}
// 初始化
const INIT_STATE: UserStateType = {
  username: '',
  nickname: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    // 登录操作：存储用户信息
    loginReducer: (
      state: UserStateType,
      action: PayloadAction<UserStateType>
    ) => {
      // 设置username、nickname到redux store
      return action.payload
    },
    // 退出登录操作：初始化用户信息（清空）
    logoutReducer: () => INIT_STATE,
  },
})

// 暴露actions
export const { loginReducer, logoutReducer } =
  userSlice.actions
// 暴露reducer
export default userSlice.reducer
