// props
export type QuestionInfoPropsType = {
  title?: string // 标题
  desc?: string // 描述

  // 用于 PropCompoent 组件
  onChange?: (options: QuestionInfoPropsType) => void // 事件
  disabled?: boolean // 禁用 form 修改属性
}

// 默认值
export const QuestionInfoDefaultProps: QuestionInfoPropsType =
  {
    title: '问卷标题',
    desc: '问卷描述',
  }
