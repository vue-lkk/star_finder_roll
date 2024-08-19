/**
 * @deprecated 方便获取redux中数据
 * @author lkk
 */
import { useSelector } from 'react-redux'
// 导入模块类型
import { StateType } from '../store'
// 导入用户信息类型
import { UserStateType } from '../store/userReducer'

function useGetUserInfo() {
  const { username, nickname } = useSelector<StateType>(state => state.user) as UserStateType
  return { username, nickname }
}

export default useGetUserInfo
