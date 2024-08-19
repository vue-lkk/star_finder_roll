/**
 * @description 问卷 描述
 * @author lkk
 */
// 导入画布显示的组件
import ComponentInfo from './Component'
// 导入修改属性组件
import PropComponent from './PropComponent'
// 导入默认类型
import { QuestionInfoDefaultProps } from './interface'
// 导出所有类型
export * from './interface'

// info 组件的配置
export default {
  title: '问卷信息',
  type: 'questionInfo', // 要和后端统一好
  Component: ComponentInfo, // 画布显示的组件
  PropComponent, // 修改属性组件
  defaultProp: QuestionInfoDefaultProps, // 默认属性值
}
