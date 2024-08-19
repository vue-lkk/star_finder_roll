import React, { FC } from 'react'
// 引入类型
import {
  QuestionTextareaPropsType,
  QuestionTextareaDefaultProps,
} from './interface'
import { Typography, Input } from 'antd'

const { Paragraph } = Typography
const { TextArea } = Input

const QuestionTextarea: FC<QuestionTextareaPropsType> = (
  props: QuestionTextareaPropsType
) => {
  // 默认属性 与 props合并
  const { title, placeholder } = {
    ...QuestionTextareaDefaultProps,
    ...props,
  }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionTextarea
