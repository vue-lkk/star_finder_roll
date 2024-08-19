import type { Meta, StoryObj } from '@storybook/react'
// 引入QuestionInfo组件
import Component from '../../components/QuestionComponets/QuestionCheckbox/Component'

export default {
  title: 'Question/QuestionCheckbox',
  component: Component,
} satisfies Meta<typeof Component>

type Story = StoryObj<typeof Component>

// 默认属性
export const Default: Story = {
  args: {},
}

// 设置属性
export const SetProps: Story = {
  args: {
    title: '多选标题',
    isVertical: true,
    list: [
      { value: 'v1', text: 't1', checked: false },
      { value: 'v2', text: 't2', checked: true },
      { value: 'v3', text: 't3', checked: true },
    ],
  },
}
