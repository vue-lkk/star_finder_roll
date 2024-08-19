import React, { FC, useMemo, useRef } from 'react'
import styles from './StatHeader.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import QRCode from 'qrcode.react'
import {
  Button,
  Typography,
  Space,
  Input,
  Tooltip,
  InputRef,
  message,
  Popover,
} from 'antd'
import {
  CopyOutlined,
  LeftOutlined,
  QrcodeOutlined,
} from '@ant-design/icons'
import useGetPageInfo from '../../../hooks/useGetPageInfo'

const { Title } = Typography

const StatHeader: FC = () => {
  // 导航
  const navigate = useNavigate()
  // 获取标题
  const { title, isPublished } = useGetPageInfo()
  // 获取问卷id
  const { id } = useParams()

  // 拷贝链接
  const urlInputRef = useRef<InputRef>(null)
  function copy() {
    const elem = urlInputRef.current
    if (elem === null) return
    elem.select() // 选中 input 的内容
    document.execCommand('copy') // 拷贝选中的内容（可以用来富文本编辑器的操作）
    message.success('拷贝成功')
  }

  // 链接和二维码
  // function genLinkAndQRCodeElem() {
  //   if (isPublished) return null

  //   // 拼接url【需要参考C端的规则】
  //   const url = `http://192.168.31.137:8000/question/${id}`

  //   // 定义二维码组件
  //   const QRCodeElem = (
  //     <div>
  //       <QRCode value={url} size={150}></QRCode>
  //     </div>
  //   )

  //   return (
  //     <Space>
  //       {/* 链接 */}
  //       <Input
  //         value={url}
  //         style={{ width: '300px' }}
  //         ref={urlInputRef}
  //       ></Input>
  //       <Tooltip title="拷贝链接">
  //         <Button
  //           icon={<CopyOutlined />}
  //           onClick={copy}
  //         ></Button>
  //       </Tooltip>
  //       {/* 二维码 */}
  //       <Popover content={QRCodeElem}>
  //         <Button icon={<QrcodeOutlined />}></Button>
  //       </Popover>
  //     </Space>
  //   )
  // }

  // 链接和二维码
  // 使用 useMemo 1.依赖项是否经常变化 2.缓存的元素是否创建成本较高
  const LinkAndQRCodeElem = useMemo(() => {
    if (isPublished) return null

    // 拼接url【需要参考C端的规则】
    const url = `http://192.168.31.137:3000/question/${id}`

    // 定义二维码组件
    const QRCodeElem = (
      <div>
        <QRCode value={url} size={150}></QRCode>
      </div>
    )

    return (
      <Space>
        {/* 链接 */}
        <Input
          value={url}
          style={{ width: '300px' }}
          ref={urlInputRef}
        ></Input>
        <Tooltip title="拷贝链接">
          <Button
            icon={<CopyOutlined />}
            onClick={copy}
          ></Button>
        </Tooltip>
        {/* 二维码 */}
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }, [id, isPublished])

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => navigate(-1)}
            >
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>
          {LinkAndQRCodeElem}
        </div>
        <div className={styles.right}>
          <Button
            type="primary"
            onClick={() => navigate(`/question/edit/${id}`)}
          >
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
