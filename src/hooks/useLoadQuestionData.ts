/**
 * @description 获取单个问卷接口 hook
 * @author lkk
 */
import { useEffect } from 'react'
// 接口
import { getQuestionService } from '../services/question'
// 获取params参数
import { useParams } from 'react-router-dom'
// 第三方hooks
import { useRequest } from 'ahooks'

import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer'
import { resetPageInfo } from '../store/componentsReducer/pageInfoReducer'

function useLoadQuestionData() {
  // 获取问卷id
  const { id = '' } = useParams()
  // 提交action
  const dispatch = useDispatch()

  // 请求获取单个问卷信息
  const { loading, data, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷 id')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    }
  )

  // 根据获取的 data,设置 redux store
  useEffect(() => {
    if (!data) return
    // 结构出后端返回的数据
    const {
      title = '',
      desc,
      js,
      css,
      isPublished,
      componentList = [],
    } = data

    // 获取默认的selectedId
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }

    // 将后端返回的componentList组件列表数据，存储到reudx store
    dispatch(
      resetComponents({
        selectedId,
        componentList,
        copyComponent: null,
      })
    )

    // 将后端返回的 pageInfo 页面设置数据，存储到reudx store
    dispatch(
      resetPageInfo({
        title, // 标题
        desc, //描述
        js, // javascript脚本
        css, // css样式
        isPublished, // 问卷是否发布
      })
    )
  }, [data])

  // 判断 id 变化，执行 ajax 加载问卷数据
  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadQuestionData
