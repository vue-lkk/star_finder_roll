import { useEffect, useState } from 'react'
// 引入获取redux数据的hooks
import useGetUserInfo from './useGetUserInfo'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import { useDispatch } from 'react-redux'
import { loginReducer } from '../store/userReducer'

function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] =
    useState(true)
  const dispatch = useDispatch()

  // 利用ahooks的useRequest 发送请求
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      // 存储到reudx stroe
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })

  // 判断reudx 是否已经存在用户信息
  const { username } = useGetUserInfo()
  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
      return
    }
    // 不存在，发送请求获取用户信息
    run()
  }, [username])
  return { waitingUserData }
}

export default useLoadUserData
