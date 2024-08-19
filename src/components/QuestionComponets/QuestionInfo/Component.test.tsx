import React from 'react'
import { render, screen } from '@testing-library/react'

import Component from './Component'

test('默认属性', () => {
  render(<Component />) // 组件渲染
  // 根据文本获取这个元素
  const h = screen.getByText('问卷标题')
  expect(h).toBeInTheDocument() // 断言
})

test('传入属性', () => {
  render(<Component title="hello" desc="world" />) // 组件渲染
  // 根据文本获取这个元素
  const h = screen.getByText('hello')
  expect(h).toBeInTheDocument() // 断言
  const p = screen.getByText('world')
  expect(p).toBeInTheDocument() // 断言
})

test('多行换行', () => {
  render(<Component desc={'啊\n额\n哦'} />) // 组件渲染
  // 根据文本获取这个元素
  const span = screen.getByText('啊')
  // 断言: 在span标签中
  expect(span).toBeInTheDocument()
  // 断言: span标签的内文本内容包含'啊'
  expect(span).toHaveTextContent('啊')
  // 断言: 被换行了，span标签的内文本内容不包含'额哦'
  expect(span).not.toHaveTextContent('啊哦')
})
