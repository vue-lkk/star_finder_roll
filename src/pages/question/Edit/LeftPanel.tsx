import React, { FC } from 'react'
import {
  AndroidOutlined,
  DatabaseOutlined,
} from '@ant-design/icons'
import Lib from './ComponentLib'
import { Tabs } from 'antd'
import Layers from './Layers'

const LeftPanel: FC = () => {
  const tabItems = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AndroidOutlined />
          组件库
        </span>
      ),
      children: (
        <div>
          <Lib />
        </div>
      ),
    },
    {
      key: 'layers',
      label: (
        <span>
          <DatabaseOutlined />
          图层
        </span>
      ),
      children: <Layers />,
    },
  ]
  return (
    <div>
      <Tabs
        defaultActiveKey="componentLib"
        items={tabItems}
      />
    </div>
  )
}
export default LeftPanel
