/**
 * @deprecated 方便获取redux中的页面设置数据
 * @author lkk
 */
import { useSelector } from 'react-redux'
// 导入模块类型
import type { StateType } from '../store'
// 导入页面设置数据类型
import type { PageInfoStateType } from '../store/componentsReducer/pageInfoReducer'

function useGetPageInfo() {
  const pageInfo = useSelector<StateType>(
    state => state.pageInfo
  ) as PageInfoStateType

  return pageInfo
}

export default useGetPageInfo
