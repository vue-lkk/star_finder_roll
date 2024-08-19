// props
export type QuestionTextareaPropsType = {
  title?: string
  placeholder?: string

  onChange?: (options: QuestionTextareaPropsType) => void // 事件
  disabled?: boolean // 禁用 form 修改属性
}

// 默认值
export const QuestionTextareaDefaultProps: QuestionTextareaPropsType =
  {
    title: '输入框标题',
    placeholder: '请输入...',
  }
