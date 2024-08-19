import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component />)
  const p = screen.getByText('单选标题')
  expect(p).toBeInTheDocument()

  for (let i = 1; i < 3; i++) {
    // 根据radio的value获取元素
    const radio = screen.getByDisplayValue(`item${i}`)
    expect(radio).toBeInTheDocument()
    // 获取到lebel元素
    const lebel = screen.getByText(`选项${i}`)
    expect(lebel).toBeInTheDocument()
  }
})

test('传入属性', () => {
  const opts = [
    { value: 'v1', text: 't1' },
    { value: 'v2', text: 't2' },
    { value: 'v3', text: 't3' },
  ]
  const value = 'v1'
  render(
    <Component
      title="hello"
      isVertical={true}
      options={opts}
      value={value}
    />
  )
  const p = screen.getByText('hello')
  expect(p).toBeInTheDocument()

  for (let i = 1; i <= 3; i++) {
    const curVal = `v${i}`
    // 根据radio的value获取元素
    const radio = screen.getByDisplayValue(curVal)
    expect(radio).toBeInTheDocument()
    // 获取到lebel元素
    const lebel = screen.getByText(`t${i}`)
    expect(lebel).toBeInTheDocument()

    // 选择的
    if (curVal === value) {
      expect(radio.getAttribute('checked')).not.toBeNull()
    }
  }
})
