/**
 * @description 问卷 图片
 * @author lkk
 */
// 导入画布显示的组件
import ComponentImage from './Component'
// 导入修改属性组件
import PropComponent from './PropComponent'
// 导入默认类型
import { QuestionImageDefualtProps } from './interface'
// 导出所有类型
export * from './interface'

// Image 组件的配置
export default {
  title: '图片',
  type: 'questionImage', // 要和后端统一好
  Component: ComponentImage, // 画布显示的组件
  PropComponent, // 导入修改属性组件
  defaultProp: QuestionImageDefualtProps, // 默认属性值
}
