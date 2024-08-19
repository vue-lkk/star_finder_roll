// 定义QuestionTitle组件属性
export type QuestionTitlePropsType = {
  text?: string // 内容
  level?: 1 | 2 | 3 | 4 | 5 // 层级 h1~h5
  isCenter?: boolean // 居中

  onChange?: (options: QuestionTitlePropsType) => void // 事件
  disabled?: boolean // 禁用 form 修改属性
}

// 默认属性
export const QuestionTitleDefaultProps: QuestionTitlePropsType =
  {
    text: '一行标题',
    level: 1,
    isCenter: false,
  }
