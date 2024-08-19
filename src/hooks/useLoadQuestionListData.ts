import { useSearchParams } from 'react-router-dom'
// 第三方hooks
import { useRequest } from 'ahooks'
// 接口
import { getQuestionListService } from '../services/question'
// 常量
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '../constant/index'

type SearchOption = {
  isStar: boolean
  isDeleted: boolean
}

function useLoadQuestionListData(
  options: Partial<SearchOption> = {}
) {
  // isStar：标星，isDeleted：回收站
  const { isStar, isDeleted } = options
  const [searchParams] = useSearchParams()

  const { data, loading, error, refresh } = useRequest(
    async () => {
      // 获取到搜索关键字
      const keyword =
        searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      // 当前页
      const page =
        parseInt(
          searchParams.get(LIST_PAGE_PARAM_KEY) || ''
        ) || 1
      // 每页长度
      const pageSize =
        parseInt(
          searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || ''
        ) || LIST_PAGE_SIZE

      // 发送请求
      const data = await getQuestionListService({
        keyword,
        isStar,
        isDeleted,
        page,
        pageSize,
      })
      // 必须返回请求回来的数据
      return data
    },
    {
      // 刷新的依赖项(当searchParams改变，重新执行useRequest)
      refreshDeps: [searchParams],
    }
  )
  return { data, loading, error, refresh }
}

export default useLoadQuestionListData
