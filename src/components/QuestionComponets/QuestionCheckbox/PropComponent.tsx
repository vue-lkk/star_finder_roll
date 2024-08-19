import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox, Button, Space } from 'antd'
import {
  QuestionCheckboxPropsType,
  QuestionCheckboxDefaultProps,
  OptionType,
} from './interface'
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import { nanoid } from 'nanoid'

const PropComponent: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType
) => {
  const {
    title,
    isVertical,
    list = [],
    onChange,
    disabled,
  } = { ...QuestionCheckboxDefaultProps, ...props }
  // Form.Item 可以通过 dependencies 属性，设置关联字段。当关联
  // 字段的值发生变化时，会触发校验与更新。
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      title,
      isVertical,
      list,
    })
  }, [title, isVertical, list])

  // 表单数据改变触发该事件
  function handleValueChange() {
    const newValues =
      form.getFieldsValue() as QuestionCheckboxPropsType
    const { list = [] } = newValues
    list.forEach(opt => {
      console.log(opt)
      if (opt.value) return
      opt.value = nanoid(5)
    })
    // 触发 onchange 函数
    onChange && onChange(newValues)
  }

  return (
    <Form
      form={form}
      name="dependencies"
      layout="vertical"
      initialValues={{ title, isVertical, list }}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有的选项(可删除) */}
              {fields.map(({ key, name }, index) => {
                // console.log(key, name)
                return (
                  <Space key={key} align="baseline">
                    {/* 当前选项 是否选中 */}
                    <Form.Item
                      name={[name, 'checked']}
                      valuePropName="checked"
                    >
                      <Checkbox></Checkbox>
                    </Form.Item>
                    {/* 当前选项输入框 */}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        {
                          required: true,
                          message: '请输入选项文字',
                        },
                        {
                          validator: (_, text) => {
                            // 获取到所有字段
                            const { list = [] } =
                              form.getFieldsValue()
                            // 记录
                            let num = 0
                            list.forEach(
                              (opt: OptionType) => {
                                if (opt.text === text) num++
                              }
                            )
                            if (num === 1)
                              return Promise.resolve()
                            return Promise.reject(
                              new Error('和其他选项重复了')
                            )
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项文字..." />
                    </Form.Item>
                    {/* 当前选项删除按钮 */}
                    {index > 0 && (
                      <MinusCircleOutlined
                        style={{ fontSize: '18px' }}
                        onClick={() => remove(name)}
                      />
                    )}
                  </Space>
                )
              })}

              {/* 添加选项 */}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() =>
                    add({
                      text: '',
                      value: '',
                      checked: false,
                    })
                  }
                  icon={
                    <PlusCircleOutlined
                      style={{ fontSize: '18px' }}
                    />
                  }
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
