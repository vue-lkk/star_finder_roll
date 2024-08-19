import React, { FC, useState } from 'react'
import styles from './QuestionCard.module.scss'
import {
  Space,
  Button,
  Divider,
  Tag,
  Popconfirm,
  Modal,
  message,
  Typography,
} from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  StarFilled,
  CopyOutlined,
  DeleteOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { useRequest } from 'ahooks'
// 接口
import {
  updateQuestionService,
  duplicateQuestionService,
} from '../services/question'
const { confirm } = Modal
const { Title } = Typography

// props类型
type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const {
    _id,
    title,
    isPublished,
    isStar,
    answerCount,
    createdAt,
  } = props
  const navigate = useNavigate()

  // 修改标星
  const [isStarState, setIsStarState] = useState(isStar)
  // 发送请求修改标星
  const { loading: changeStarLoading, run: changeStar } =
    useRequest(
      async () => {
        await updateQuestionService(_id, {
          isStar: !isStarState,
        })
      },
      {
        manual: true,
        onSuccess() {
          setIsStarState(!isStarState) // 更新isStar
          message.success('更新成功')
        },
      }
    )

  // 复制
  const { loading: duplicateLoading, run: duplicate } =
    useRequest(
      // async () => {
      //   const res = await duplicateQuestionService(_id)
      //   // 这里需要返回请求结果
      //   return res
      // }
      // 或者：直接这样写
      async () => await duplicateQuestionService(_id),
      {
        manual: true,
        // 在这里才能拿到请求的数据
        onSuccess(result: any, data) {
          console.log(result, data)
          message.success('复制成功')
          navigate(`/question/edit/${result._id}`) // 跳转到问卷编辑页
        },
      }
    )

  // 删除
  const [isDeletedState, setIsDeletedState] =
    useState(false)
  const { loading: delLoading, run: deleteQuestion } =
    useRequest(
      async () =>
        await updateQuestionService(_id, {
          isDeleted: true,
        }),
      {
        manual: true,
        onSuccess() {
          message.success('删除成功')
          setIsDeletedState(true)
        },
      }
    )
  function del() {
    confirm({
      title: '确定删除该问卷？',
      icon: <DeleteOutlined />,
      okText: '确定',
      cancelText: '取消',
      onOk: deleteQuestion,
    })
  }
  // 已经删除的问卷，不要再渲染卡片了
  if (isDeletedState) return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {/* 左侧：问卷名称 */}
        <div className={styles.left}>
          <Link
            to={
              isPublished
                ? `/question/stat/${_id}`
                : `/question/edit/${_id}`
            }
          >
            {/* 间隔组件 */}
            <Space>
              {isStarState && (
                <StarFilled style={{ color: '#ffb806' }} />
              )}
            </Space>
            {title}
          </Link>
        </div>
        {/* 右侧：发布情况 、时间 */}
        <div className={styles.right}>
          {/* 间隔组件 */}
          <Space>
            {isPublished ? (
              <span style={{ color: 'green' }}>
                <Tag color="#87d068">已发布</Tag>
              </span>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷: {answerCount}</span>
            <span
              style={{
                background: 'rgb(240 242 255)',
                padding: '2px 4px',
                borderRadius: '7px',
              }}
            >
              <FieldTimeOutlined />
              {createdAt}
            </span>
          </Space>
        </div>
      </div>

      {/* 分割线 */}
      <Divider style={{ margin: '12px' }} />

      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() =>
                navigate(`/question/edit/${_id}`)
              }
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              size="small"
              icon={<LineChartOutlined />}
              onClick={() =>
                navigate(`/question/stat/${_id}`)
              }
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<StarOutlined />}
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              placement="top"
              title="确定复制该问卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button
                type="text"
                size="small"
                icon={<CopyOutlined />}
                disabled={duplicateLoading}
              >
                复制
              </Button>
            </Popconfirm>

            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={del}
              disabled={delLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
