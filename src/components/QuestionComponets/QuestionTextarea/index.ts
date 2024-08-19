/**
 * @description 问卷 输入框
 * @author lkk
 */
// 导入画布显示的组件
import ComponentTextarea from './Component'
// 导入修改属性组件
import PropComponent from './PropComponent'
// 导入类型
import { QuestionTextareaDefaultProps } from './interface'

// 暴露所有类型
export * from './interface'

// Textarea 组件的配置
export default {
  title: '多行输入',
  type: 'questionTextarea', // 要和后端统一好
  Component: ComponentTextarea, // 画布显示的组件
  PropComponent, // 修改属性组件
  defaultProp: QuestionTextareaDefaultProps, // 默认属性
}
