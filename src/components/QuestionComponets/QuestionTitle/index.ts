/**
 * @description 问卷 文本
 * @author lkk
 */
// 导入画布显示的组件
import ComponentTitle from './Component'
// 导入修改属性组件
import PropComponent from './PropComponent'
// 导入默认类型
import { QuestionTitleDefaultProps } from './interface'
// 导出所有类型
export * from './interface'

// Title 组件的配置
export default {
  title: '标题',
  type: 'questionTitle', // 要和后端统一好
  Component: ComponentTitle, // 画布显示的组件
  PropComponent, // 导入修改属性组件
  defaultProp: QuestionTitleDefaultProps, // 默认属性值
}
