// props
export type QuestionInputPropsType = {
  title?: string
  placeholder?: string

  onChange?: (options: QuestionInputPropsType) => void // 事件
  disabled?: boolean // 禁用 form 修改属性
}

// 默认值
export const QuestionInputDefaultProps: QuestionInputPropsType =
  {
    title: '输入框标题',
    placeholder: '请输入...',
  }
