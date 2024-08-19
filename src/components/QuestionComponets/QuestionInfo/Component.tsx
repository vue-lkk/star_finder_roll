import React, { FC } from 'react'
import {
  QuestionInfoDefaultProps,
  QuestionInfoPropsType,
} from './interface'
import { Typography } from 'antd'
const { Title, Paragraph } = Typography

const QuestionInfo: FC<QuestionInfoPropsType> = (
  props: QuestionInfoPropsType
) => {
  // 默认属性 与 props合并
  const { title, desc } = {
    ...QuestionInfoDefaultProps,
    ...props,
  }

  // 处理换行
  const descTextList = desc?.split('\n') || []

  return (
    <div style={{ textAlign: 'center' }}>
      <Title style={{ fontSize: '24px' }}>{title}</Title>
      <Paragraph>
        {descTextList.map((t, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        ))}
      </Paragraph>
    </div>
  )
}

export default QuestionInfo
