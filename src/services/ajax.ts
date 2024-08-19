import { message } from 'antd'
import axios from 'axios'
import { config } from 'process'
import { getToken } from '../utils/user-token'

// 返回数据类型
export type ResType = {
  code: number
  data?: ResDataType
  msg?: string
}
// 请求参数类型
export type ResDataType = {
  [key: string]: any
}

const instance = axios.create({
  timeout: 10 * 1000,
})

// 请求拦截器：统一处理token
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器：统一处理 code 和 msg
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { code, data, msg } = resData
  if (code !== 0) {
    // 错误提示
    if (msg) {
      message.error(msg)
    }
    // 抛出错误
    throw new Error(msg)
  }
  return data as any
})

export default instance

// 举例：ResDataType类型
// const data: ResDataType = {
//   name: 'lkk',
//   age: 18,
// }
// console.log(data)
