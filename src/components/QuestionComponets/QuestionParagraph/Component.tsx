import React, { FC } from 'react'
import { QuestionParagraphPropsType } from './interface'
import { QuestionParagraphDefaultProps } from './index'
import { Typography, Input } from 'antd'
const { Paragraph } = Typography

const QuestionParagraph: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType
) => {
  // 默认属性 与 props合并
  const { text, isCenter } = {
    ...QuestionParagraphDefaultProps,
    ...props,
  }

  // 处理换行
  const textList = text?.split('\n') || []

  return (
    <Paragraph
      style={{
        textAlign: isCenter ? 'center' : 'start',
        marginBottom: '0',
      }}
    >
      {textList.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
    </Paragraph>
  )
}

export default QuestionParagraph
