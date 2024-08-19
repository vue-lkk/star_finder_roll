import React, {
  ChangeEvent,
  FC,
  useEffect,
  useState,
} from 'react'
import styles from './EditHeader.module.scss'
import {
  Button,
  Input,
  Space,
  Typography,
  message,
} from 'antd'
import {
  EditOutlined,
  LeftOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../store/componentsReducer/pageInfoReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  useDebounceEffect,
  useKeyPress,
  useRequest,
} from 'ahooks'
import { updateQuestionService } from '../../../services/question'
const { Title } = Typography

// 显示和修改问卷标题 【单独抽离出来】
const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  // 切换 input 和 内容
  const [editState, setEditState] = useState(false)
  const dispatch = useDispatch()

  // 修改问卷标题
  function handleChnagePageTitle(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    dispatch(changePageTitle(newTitle))
  }

  // 修改问卷标题状态
  if (editState) {
    return (
      <Input
        value={title}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        onChange={handleChnagePageTitle}
      />
    )
  }
  // 显示问卷标题状态
  return (
    <Space>
      <Title>{title}</Title>
      <Button
        icon={
          <EditOutlined
            type="text"
            onClick={() => setEditState(true)}
          />
        }
      ></Button>
    </Space>
  )
}

// 保存按钮 【单独抽离出来】
const SaveButton: FC = () => {
  // 获取问卷id
  const { id } = useParams()
  // 发生变化：问卷组件列表
  const { componentList = [] } = useGetComponentInfo()
  // 发生变化：页面设置数据
  const pageInfo = useGetPageInfo()

  // 发送请求
  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
      })
    },
    {
      manual: true,
    }
  )

  // 快捷键保存
  useKeyPress(
    ['ctrl.s', 'meta.s'],
    (event: KeyboardEvent) => {
      // 阻止默认行为
      event.preventDefault()
      // 防止频繁请求
      if (!loading) save()
    }
  )

  // 自动保存(不是定期保存，不是定时器)
  useDebounceEffect(
    () => {
      console.log(componentList)
      save()
    },
    [componentList, pageInfo],
    {
      wait: 1000,
    }
  )

  return (
    <Button
      onClick={save}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      保存
    </Button>
  )
}

// 发布按钮 【单独抽离出来】
const PublishButton: FC = () => {
  // 删除,假删除 isDeleted = true (更新)
  // 发布, isPublished = true (更新)

  const navigate = useNavigate()
  // 获取问卷id
  const { id } = useParams()
  // 发生变化：问卷组件列表
  const { componentList = [] } = useGetComponentInfo()
  // 发生变化：页面设置数据
  const pageInfo = useGetPageInfo()

  // 发送请求
  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true, // 标记着问卷已经被发布
      })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        navigate('/question/stat/' + id) // 统计页面
      },
    }
  )

  return (
    <Button type="primary" onClick={pub} disabled={loading}>
      发布
    </Button>
  )
}

// 编辑器的头部
const EditHeader: FC = () => {
  const navigate = useNavigate()

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
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
