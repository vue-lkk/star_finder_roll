// 定义QuestionImage组件属性
export type QuestionImagePropsType = {
  src?: string //图片路径
  width?: number
  height?: number
  isCenter?: boolean

  onChange?: (options: QuestionImagePropsType) => void // 事件
  disabled?: boolean // 禁用 form 修改属性
}

// 默认属性
export const QuestionImageDefualtProps: QuestionImagePropsType =
  {
    src: '',
    width: 100,
    height: 100,
    isCenter: true,
  }
