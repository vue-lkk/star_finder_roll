/**
 * @description 问卷 段落
 * @author lkk
 */
// 导入画布显示的组件
import ComponentParagraph from './Component'
// 导入修改属性组件
import PropComponent from './PropComponent'
// 导入默认类型
import { QuestionParagraphDefaultProps } from './interface'
// 导出所有类型
export * from './interface'

// Paragraph 组件的配置
export default {
  title: '段落',
  type: 'questionParagraph', // 要和后端统一好
  Component: ComponentParagraph, // 画布显示的组件
  PropComponent, // 修改属性组件
  defaultProp: QuestionParagraphDefaultProps, // 默认属性值
}
