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
  Upload,
} from 'antd'
import {
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons'

import type { UploadFile } from 'antd'

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
  const [newSrc, setNewSrc] = useState('')

  const [fileList, setFileList] = useState<UploadFile[]>([
    // {
    //   uid: '-1',
    //   name: 'yyy.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   thumbUrl:
    //     'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ])
  useEffect(() => {
    form.setFieldsValue({ src, width, height, isCenter })
  }, [src, width, height, isCenter, fileList])

  // useEffect(() => {
  //   form.setFieldValue('src', 'newSrc')
  // }, [newSrc])

  // 表单数据改变触发该事件
  function handleValueChange() {
    onChange && onChange(form.getFieldsValue())
  }

  // const normFile = (e: any) => {
  //   console.log('!!!', e)
  //   if (Array.isArray(e)) {
  //     return e
  //   }
  //   return e?.fileList
  // }

  async function handleChange(even: any) {
    const { file, fileList } = even
    // const f = file.originFileObj.File.File
    console.log(file)
    // const base64 = await fileToBase64(f)
    // console.log(base64)
    onChange &&
      onChange({
        src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      })
    // setFileList(fileList)
  }

  function fileToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = ev => {
        resolve(ev.target?.result)
      }
    })
  }

  return (
    <div>
      <Form
        form={form}
        name="dependencies"
        layout="vertical"
        initialValues={{ src, width, height, isCenter }}
        onValuesChange={handleValueChange}
        disabled={disabled}
      >
        <Form.Item
          label="图片"
          valuePropName="src"
          // getValueFromEvent={normFile}
        >
          <Upload
            action="/api/question/510000199411301256"
            listType="picture-card"
            onChange={handleChange}
            defaultFileList={[...fileList]}
          >
            <button
              style={{ border: 0, background: 'none' }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
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
