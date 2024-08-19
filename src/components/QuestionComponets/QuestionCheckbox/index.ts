/**
 * @description 问卷 多选框
 * @author lkk
 */
// 导入画布显示的组件
import ComponentCheckbox from './Component'
// 导入修改属性组件
import PropComponent from './PropComponent'
// 导入图表统计组件
import StatComponent from './StatComponent'
// 导入类型
import { QuestionCheckboxDefaultProps } from './interface'

// 暴露所有类型
export * from './interface'

// Textarea 组件的配置
export default {
  title: '多选',
  type: 'questionCheckbox', // 要和后端统一好
  Component: ComponentCheckbox, // 画布显示的组件
  PropComponent, // 修改属性组件
  StatComponent, // 图表统计组件
  defaultProp: QuestionCheckboxDefaultProps, // 默认属性
}
