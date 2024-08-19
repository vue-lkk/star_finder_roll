import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentStateType } from '../store/componentsReducer'

function useGetComponentInfo() {
  // 获取到components 的store模块
  const components = useSelector<StateType>(
    state => state.components.present
  )
  // 获取到单个问卷中的组件列表数据
  const {
    componentList = [],
    selectedId,
    copyComponent,
  } = components as ComponentStateType

  // 获取到选中的组件
  const selectedComponent = componentList.find(
    c => c.fe_id == selectedId
  )

  return {
    componentList,
    selectedId,
    selectedComponent,
    copyComponent,
  }
}

export default useGetComponentInfo
