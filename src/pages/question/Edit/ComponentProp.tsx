import React, { FC } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  ComponentPropsType,
  getComponentConfigByType,
} from '../../../components/QuestionComponets'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../store/componentsReducer'

const NoProp: FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>未选中组件</div>
  )
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()

  // 获取到选中的组件
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) return <NoProp />

  // 根据类型获取对应的组件的配置
  const { type, props, isLocked, isHidden } =
    selectedComponent
  // 获取到组件的配置
  const componentConfig = getComponentConfigByType(type)
  if (componentConfig == null) return <NoProp />

  // 解构出修改属性的组件
  const { PropComponent } = componentConfig

  function handleChangeProp(options: ComponentPropsType) {
    // 判断是否选中组件
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent
    console.log(123)
    dispatch(
      changeComponentProps({ fe_id, newProps: options })
    )
  }

  return (
    <PropComponent
      {...props}
      onChange={handleChangeProp}
      disabled={isLocked || isHidden}
    />
  )
}

export default ComponentProp
