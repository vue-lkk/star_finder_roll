import React, { FC, useCallback } from 'react'
// 引入 组件配置TS类型 和 组件配置分组
import {
  ComponentConfigType,
  componentConfigGroup,
} from '../../../components/QuestionComponets'
import styles from './ComponentLib.module.scss'

import { Typography } from 'antd'
import { useDispatch } from 'react-redux'
// 添加组件到画布 action
import { addComponent } from '../../../store/componentsReducer'
import { nanoid } from '@reduxjs/toolkit'
const { Title } = Typography

// 生成组件
function genComponent(c: ComponentConfigType) {
  const { title, type, Component, defaultProp } = c
  const dispatch = useDispatch()

  // 点击左侧物料，添加组件到画布
  const handleClick = useCallback(() => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        type,
        title,
        props: defaultProp,
      })
    )
  }, [])

  return (
    <div
      key={type}
      className={styles.wrapper}
      onClick={handleClick}
    >
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const Lib: FC = () => {
  return (
    <>
      <div
        style={{
          maxHeight: '800px',
          overflowY: 'scroll',
        }}
      >
        {componentConfigGroup.map((group, index) => {
          const { groupId, groupName, components } = group
          return (
            <div key={groupId}>
              <Title
                level={3}
                style={{
                  fontSize: '16px',
                  backgroundColor: 'rgb(54 131 210)',
                  color: '#fff',
                  padding: '5px 2px ',
                  textAlign: 'center',
                  marginTop: index > 0 ? '30px' : '0',
                }}
              >
                {groupName}
              </Title>
              <div>
                {components.map(c => genComponent(c))}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Lib
