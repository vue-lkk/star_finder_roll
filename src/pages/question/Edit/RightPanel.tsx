import React, { FC, useEffect, useState } from 'react'
import {
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Tabs } from 'antd'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

// 枚举类型
enum TAB_KEYS {
  PROP_KEY = 'props',
  SETTING_KEY = 'setting',
}

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(
    TAB_KEYS.PROP_KEY
  )
  const { selectedId } = useGetComponentInfo()
  // 监听selectedId变化
  useEffect(() => {
    if (selectedId) setActiveKey(TAB_KEYS.PROP_KEY)
    else setActiveKey(TAB_KEYS.SETTING_KEY)
  }, [selectedId])

  const handleChnageKey = (key: string) => {
    const newKey =
      key === 'props'
        ? TAB_KEYS.PROP_KEY
        : TAB_KEYS.SETTING_KEY
    setActiveKey(newKey)
  }

  const tabItems = [
    {
      key: 'props',
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: (
        <div>
          <ComponentProp />
        </div>
      ),
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ]
  return (
    <div>
      <Tabs
        activeKey={activeKey}
        items={tabItems}
        onChange={handleChnageKey}
      />
    </div>
  )
}

export default RightPanel
