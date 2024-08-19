// 定义QuestionCarousel组件属性
export type QuestionCarouselPropsType = {
  width?: number
  height?: number
  srcArr?: Array<[]>
  autoplay?: boolean

  onChange?: (options: QuestionCarouselPropsType) => void // 事件
  disabled?: boolean // 禁用 form 修改属性
}

// 默认属性
export const QuestionCarouselDefaultProps: QuestionCarouselPropsType =
  {
    width: 300,
    height: 160,
    srcArr: [],
    autoplay: true,
  }
