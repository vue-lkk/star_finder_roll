/**
 * @description 问卷 输入框
 * @author lkk
 */
// 导入画布显示的组件
import ComponentInput from './Component'
// 导入修改属性组件
import PropComponent from './PropComponent'
// 导入类型
import { QuestionInputDefaultProps } from './interface'

// 暴露所有类型
export * from './interface'

// input 组件的配置
export default {
  title: '输入框',
  type: 'questionInput', // 要和后端统一好
  Component: ComponentInput, // 画布显示的组件
  PropComponent, // 修改属性组件
  defaultProp: QuestionInputDefaultProps, // 默认属性
}
