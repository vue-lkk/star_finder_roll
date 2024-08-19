/**
 * @description 问卷 走马灯
 * @author lkk
 */
// 导入画布显示的组件
import ComponentCarousel from './Component'
// 导入修改属性组件
import PropComponent from './PropComponent'
// 导入默认类型
import { QuestionCarouselDefaultProps } from './interface'
// 导出所有类型
export * from './interface'

// Image 组件的配置
export default {
  title: '走马灯',
  type: 'questionCarousel', // 要和后端统一好
  Component: ComponentCarousel, // 画布显示的组件
  PropComponent, // 导入修改属性组件
  defaultProp: QuestionCarouselDefaultProps, // 默认属性值
}
