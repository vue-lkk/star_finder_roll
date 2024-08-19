import React, {
  ChangeEvent,
  FC,
  useEffect,
  useRef,
  useState,
} from 'react'
import { QuestionImagePropsType } from './interface'
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Image,
} from 'antd'

import { PlusOutlined } from '@ant-design/icons'

// 图片组件的props类型
type UploadImageProps = {
  onBase64: (src: any) => void
  dataSrc: string
}

// 图片组件
const UploadImage: FC<UploadImageProps> = (
  props: UploadImageProps
) => {
  const { onBase64, dataSrc } = props
  // 获取input元素
  const inpRef = useRef<HTMLInputElement>(null)

  // 点击修改图片
  function handleChange() {
    // 手动触发点击input
    inpRef.current?.click()
  }

  // 监听图片修改
  async function handleFileChange(
    even: ChangeEvent<HTMLInputElement>
  ) {
    const file = (even.target.files as FileList)[0]
    // 获取到base64格式图片
    const base64 = (await fileToBase64(file)) as string
    // 传递base64格式图片数据给父组件
    onBase64(base64)
    // 关闭弹窗后清空 input 的值
    const input = inpRef.current as HTMLInputElement
    input.value = ''
  }

  // 图片转换为base64
  function fileToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      if (fileReader == null) return
      fileReader.readAsDataURL(file)
      fileReader.onload = ev => {
        resolve(ev.target?.result)
      }
    })
  }

  return (
    <div>
      <div>修改图片</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '10px 0',
        }}
      >
        <div>
          {dataSrc && (
            <Image
              fallback="data:image/png;base64,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"
              width={100}
              height={100}
              src={dataSrc}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
          )}
        </div>
        <div
          style={{
            width: '50px',
            height: '50px',
            border: '1px  dotted #ccc',
            textAlign: 'center',
            lineHeight: '50px',
            marginLeft: '10px',
            backgroundColor: 'rgb(243 239 239)',
            color: '#000',
          }}
          onClick={handleChange}
        >
          <PlusOutlined />
          <input
            type="file"
            ref={inpRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}

// 属性组件
const PropComponent: FC<QuestionImagePropsType> = (
  props: QuestionImagePropsType
) => {
  const {
    src,
    width,
    height,
    isCenter,

    onChange,
    disabled,
  } = props
  // Form.Item 可以通过 dependencies 属性，设置关联字段。
  // 当关联字段的值发生变化时，会触发校验与更新。
  const [form] = Form.useForm()

  // 监听表单属性变化,设置值
  useEffect(() => {
    form.setFieldsValue({ src, width, height, isCenter })
  }, [src, width, height, isCenter])

  // 表单数据改变触发该事件
  function handleValueChange() {
    // 修改 redux store
    onChange && onChange(form.getFieldsValue())
  }

  // 获取到组件UploadImage传递过来的base64格式图片
  function handleBase64(newSrc: any) {
    // 修改 redux store
    onChange && onChange({ src: newSrc })
  }

  return (
    <div>
      <UploadImage
        onBase64={handleBase64}
        dataSrc={src as string}
      />
      <Form
        form={form}
        name="dependencies"
        layout="vertical"
        initialValues={{ src, width, height, isCenter }}
        onValuesChange={handleValueChange}
        disabled={disabled}
      >
        <Form.Item label="修改图片路径" name="src">
          <Input />
        </Form.Item>
        <Form.Item label="图片宽度" name="width">
          <InputNumber min={50} max={500} changeOnWheel />
        </Form.Item>
        <Form.Item label="图片高度" name="height">
          <InputNumber min={50} max={500} changeOnWheel />
        </Form.Item>
        <Form.Item name="isCenter" valuePropName="checked">
          <Checkbox>居中显示</Checkbox>
        </Form.Item>
      </Form>
    </div>
  )
}

export default PropComponent
