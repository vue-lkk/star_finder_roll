import React, { FC } from 'react'
// 引入hooks
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
// 样式
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'
import { useTitle } from 'ahooks'
import useGetPageInfo from '../../../hooks/useGetPageInfo'

const Edit: FC = () => {
  // 引入获取个问卷信息的hook
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()
  const { title, isPublished } = useGetPageInfo()
  // 修改标题
  useTitle(`问卷编辑-${title}`)

  // 点击空白处清空selectedId
  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      {/* 顶部栏 */}
      <div className={styles.header}>
        <EditHeader />
      </div>

      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          {/* 左侧 */}
          <div className={styles.left}>
            <LeftPanel />
          </div>

          {/* 中间 */}
          <div
            className={styles.main}
            onClick={() => {
              clearSelectedId()
            }}
          >
            <div className={styles['canvas-wrapper']}>
              <EditCanvas isLoading={loading} />
            </div>
          </div>

          {/* 右侧 */}
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
