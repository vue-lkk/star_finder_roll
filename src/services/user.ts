import axios, { ResDataType } from './ajax'

// 获取用户信息接口
export async function getUserInfoService(): Promise<ResDataType> {
  const url = '/api/user/info'
  const data = await axios.get(url)
  return data
}

// 注册用户接口
export async function registerService(
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> {
  const url = '/api/user/register'
  const data = await axios.post(url, {
    username,
    password,
    nickname: nickname || username,
  })
  return data
}

// 登录接口
export async function loginService(
  username: string,
  password: string
): Promise<ResDataType> {
  const url = '/api/user/login'
  const data = await axios.post(url, { username, password })
  return data
}
