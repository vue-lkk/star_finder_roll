import axios, { ResDataType } from './ajax'

type SearchOption = {
  keyword: string // 搜索关键字
  isStar: boolean // 是否标星
  isDeleted: boolean // 是否删除
  page: number // 当前页
  pageSize: number // 每页长度
}

// 获取单个问卷信息接口
export async function getQuestionService(
  id: string
): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = await axios.get(url)
  return data
}

// 创建问卷接口
export async function createQuestionService(): Promise<ResDataType> {
  const url = `/api/question`
  const data = await axios.post(url)
  return data
}

// 获取 (查询) 问卷列表
export async function getQuestionListService(
  options: Partial<SearchOption>
): Promise<ResDataType> {
  const url = `/api/question`
  const data = await axios.get(url, { params: options })
  return data
}

// 更新问卷信息接口
export async function updateQuestionService(
  id: string,
  options: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = await axios.patch(url, options)
  return data
}

// 复制问卷接口
export async function duplicateQuestionService(
  id: string
): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`
  const data = await axios.post(url)
  return data
}

// 批量彻底删除
export async function deletedQuestionService(
  ids: string[]
): Promise<ResDataType> {
  const url = `/api/question`
  const data = await axios.delete(url, { data: { ids } })
  return data
}
