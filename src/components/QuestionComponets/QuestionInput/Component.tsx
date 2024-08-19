import React, { FC } from 'react'
// 引入类型
import {
  QuestionInputDefaultProps,
  QuestionInputPropsType,
} from './interface'
import { Typography, Input } from 'antd'
const { Paragraph } = Typography

const QuestionInput: FC<QuestionInputPropsType> = (
  props: QuestionInputPropsType
) => {
  // 默认属性 与 props合并
  const { title, placeholder } = {
    ...QuestionInputDefaultProps,
    ...props,
  }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionInput
