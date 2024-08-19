/**
 * @description 问卷 单选框
 * @author lkk
 */
// 导入画布显示的组件
import ComponentRadio from './Component'
// 导入修改属性组件
import PropComponent from './PropComponent'
// 导入图表统计组件
import StatComponent from './StatComponent'
// 导入类型
import { QuestionRadioDefaultProps } from './interface'

// 暴露所有类型
export * from './interface'

// Textarea 组件的配置
export default {
  title: '单选',
  type: 'questionRadio', // 要和后端统一好
  Component: ComponentRadio, // 画布显示的组件
  PropComponent, // 修改属性组件
  StatComponent, // 图表统计组件
  defaultProp: QuestionRadioDefaultProps, // 默认属性
}
