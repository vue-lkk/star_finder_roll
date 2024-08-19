import React, { FC } from 'react'
// 引入类型
import {
  QuestionTitlePropsType,
  QuestionTitleDefaultProps,
} from './interface'
import { Typography } from 'antd'
const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType
) => {
  // 默认属性 与 props合并
  const { text, level, isCenter } = {
    ...QuestionTitleDefaultProps,
    ...props,
  }

  const genFontSize = (level: number) => {
    if (level === 1) return '24px'
    if (level === 2) return '20px'
    if (level === 3) return '16px'
    return '16px'
  }

  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'start',
        marginBottom: '0',
        fontSize: genFontSize(level as number),
      }}
    >
      {text}
    </Title>
  )
}

export default QuestionTitle
