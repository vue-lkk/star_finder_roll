import React from 'react'
import { render, screen } from '@testing-library/react'

import Component from './Component'

test('默认属性', () => {
  render(<Component />)
  const h = screen.getByText('一行标题')
  expect(h).toBeInTheDocument()
})

test('传入属性', () => {
  render(
    <Component text="hello" level={2} isCenter={true} />
  )
  const h = screen.getByText('hello')
  expect(h).toBeInTheDocument()

  // h标签中的 h2 标签   toBeTruthy() 代表true , toBeFalsy() 代表false
  expect(h.matches('h2')).toBeTruthy() // 返回 <h2>

  const style = h.style
  expect(style.textAlign).toBe('center')
})
