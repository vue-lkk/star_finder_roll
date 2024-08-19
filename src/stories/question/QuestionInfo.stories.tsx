import type { Meta, StoryObj } from '@storybook/react'
// 引入QuestionInfo组件
import Component from '../../components/QuestionComponets/QuestionInfo/Component'

export default {
  title: 'Question/QuestionInfo',
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
    title: 'hello',
    desc: 'world',
  },
}

// 换行
export const DescBreakLine: Story = {
  args: {
    title: 'hello',
    desc: '你好！\n小米',
  },
}
