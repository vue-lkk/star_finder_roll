import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component />)
  const span = screen.getByText('一段段落')
  expect(span).toBeInTheDocument()
})

test('传入属性', () => {
  render(<Component text="hello" isCenter={true} />)
  const span = screen.getByText('hello')
  expect(span).toBeInTheDocument()
  // 获取父元素
  const p = span.parentElement
  // 父元素是有的
  expect(p).not.toBeNull()
  const style = p!.style || {}
  expect(style.textAlign).toBe('center')
})

test('多行换行', () => {
  render(<Component text={'啊\n额\n哦'} />) // 组件渲染
  // 根据文本获取这个元素
  const span = screen.getByText('啊')
  // 断言: 在span标签中
  expect(span).toBeInTheDocument()
  // 断言: span标签的内文本内容包含'啊'
  expect(span).toHaveTextContent('啊')
  // 断言: 被换行了，span标签的内文本内容不包含'额哦'
  expect(span).not.toHaveTextContent('啊哦')
})
