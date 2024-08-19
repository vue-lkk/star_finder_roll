import { useEffect } from 'react'
import useGetUserInfo from './useGetUserInfo'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  isLoginOrRegister,
  isNoNeeUserInfo,
} from '../router'

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (waitingUserData) return
    // 已经登录
    if (username) {
      if (isLoginOrRegister(pathname)) {
        navigate('/manage/list')
      }
      return
    }
    // 未登录
    if (isNoNeeUserInfo(pathname)) {
      return
    } else {
      navigate('/login')
    }
  }, [waitingUserData, username, pathname])
}

export default useNavPage
