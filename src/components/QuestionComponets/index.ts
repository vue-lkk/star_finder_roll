import { FC } from 'react'
// Input 输入框组件
import QuestionInputConfig, {
  QuestionInputPropsType,
} from './QuestionInput'
// Title 标题组件
import QuestionTitleConfig, {
  QuestionTitlePropsType,
} from './QuestionTitle'
// Paragraph 段落组件
import QuestionParagraphConfig, {
  QuestionParagraphPropsType,
} from './QuestionParagraph'
// Info 描述组件
import QuestionInfoConfig, {
  QuestionInfoPropsType,
} from './QuestionInfo'
// TextArea 多行输入组件
import QuestionTextareaConfig, {
  QuestionTextareaPropsType,
} from './QuestionTextarea'
// Radio 单选框组件
import QuestionRadioCondfig, {
  QuestionRadioPropsType,
  QuestionRadioStatPropsType,
} from './QuestionRadio'
// Checkbox 多选框组件
import QusetionCheckboxConfig, {
  QuestionCheckboxPropsType,
  QuestionCheckboxStatPropsType,
} from './QuestionCheckbox'
// Image 图片组件
import QuestionImageConfig, {
  QuestionImagePropsType,
} from './QuestionImage'
// Carousel 走马灯组件
import QuestionCarouselConfig, {
  QuestionCarouselPropsType,
} from './QuestionCarousel'

// 统一：各个组件的props类型
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType &
  QuestionImagePropsType &
  QuestionCarouselPropsType

// 统一：各个组件的统计属性类型
export type ComponentStatType = QuestionRadioStatPropsType &
  QuestionCheckboxStatPropsType

// 统一：组件的配置类型
export type ComponentConfigType = {
  title: string
  type: string
  Component: FC<ComponentPropsType> // 组件类型
  PropComponent: FC<ComponentPropsType>
  StatComponent?: FC<ComponentStatType>
  defaultProp: ComponentPropsType
}

// 全部组件的配置列表
const componentConfigList: ComponentConfigType[] = [
  QuestionInputConfig,
  QuestionTitleConfig,
  QuestionParagraphConfig,
  QuestionInfoConfig,
  QuestionTextareaConfig,
  QuestionRadioCondfig,
  QusetionCheckboxConfig,
  QuestionImageConfig,
  QuestionCarouselConfig,
]

// 组件分组
export const componentConfigGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [
      QuestionInfoConfig,
      QuestionTitleConfig,
      QuestionParagraphConfig,
      QuestionTextareaConfig,
    ],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [
      QuestionInputConfig,
      QuestionRadioCondfig,
      QusetionCheckboxConfig,
    ],
  },
  {
    groupId: 'imageGroup',
    groupName: '图片',
    components: [
      QuestionImageConfig,
      QuestionCarouselConfig,
    ],
  },
]

// 导出一个函数，根据类型type,获取对应的组件的配置
export function getComponentConfigByType(type: string) {
  return componentConfigList.find(c => c.type == type)
}
