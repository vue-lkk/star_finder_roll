// 单个选项的属性类型
export type OptionType = {
  value: string
  text: string
}

// props
export type QuestionRadioPropsType = {
  title?: string // 标题
  isVertical?: boolean // 是否垂直
  options?: OptionType[] // 选项
  value?: string // 选中项

  onChange?: (options: QuestionRadioPropsType) => void // 事件
  disabled?: boolean // 禁用 form 修改属性
}

// 默认值
export const QuestionRadioDefaultProps: QuestionRadioPropsType =
  {
    title: '单选标题',
    isVertical: false,
    options: [
      {
        value: 'item1',
        text: '选项1',
      },
      {
        value: 'item2',
        text: '选项2',
      },
      {
        value: 'item3',
        text: '选项3',
      },
    ],
    value: '',
  }

// 统计组件的属性类型
export type QuestionRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
