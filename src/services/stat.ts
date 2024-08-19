import axios, { ResDataType } from './ajax'

// 获取问卷的统计列表
export async function getQuestionStatListService(
  questionId: string,
  options: { page: number; pageSize: number }
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}`
  const data = (await axios.get(url, {
    params: options,
  })) as ResDataType
  return data
}

// 获取组件统计数据汇总
export async function getComonentStatService(
  questionId: string,
  componentId: string
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}/${componentId}`
  const data = (await axios.get(url)) as ResDataType
  return data
}
