// props
export type QuestionParagraphPropsType = {
  text?: string
  isCenter?: boolean

  // 用于 PropCompoent 组件
  onChange?: (options: QuestionParagraphPropsType) => void // 事件
  disabled?: boolean // 禁用 form 修改属性
}

// 默认值
export const QuestionParagraphDefaultProps: QuestionParagraphPropsType =
  {
    text: '一段段落',
    isCenter: false,
  }
