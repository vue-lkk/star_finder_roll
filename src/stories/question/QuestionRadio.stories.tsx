import type { Meta, StoryObj } from '@storybook/react'
// 引入QuestionInfo组件
import Component from '../../components/QuestionComponets/QuestionRadio/Component'

export default {
  title: 'Question/QuestionRadio',
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
    title: '单选标题',
    isVertical: true,
    options: [
      { value: 'v1', text: 't1' },
      { value: 'v2', text: 't2' },
      { value: 'v3', text: 't3' },
    ],
    value: 'v1',
  },
}
