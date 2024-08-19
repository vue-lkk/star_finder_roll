import React, { FC } from 'react'
import {
  QuestionCarouselPropsType,
  QuestionCarouselDefaultProps,
} from './interface'
import { Carousel, Image } from 'antd'
import classNames from 'classnames'

const QuestionCarousel: FC<QuestionCarouselPropsType> = (
  props: QuestionCarouselPropsType
) => {
  // 默认属性 与 props合并
  const { width, height, autoplay, srcArr } = {
    ...QuestionCarouselDefaultProps,
    ...props,
  }

  const contentStyle: React.CSSProperties = {
    height: '100%',
    width: '100%',
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: '50%',
    color: '#000',
    background: 'rgb(236 236 236)',
  }

  const imgStyle: React.CSSProperties = {
    height: height + 'px',
    width: width + 'px',
    display: 'inline-block',
    textAlign: 'center',
    color: '#000',
    background: 'rgb(236 236 236)',
  }

  return (
    <Carousel>
      <div>
        <h3 style={contentStyle}>
          {/* <img
              style={imgStyle}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              alt=""
              draggable="true"
            /> */}
          <Image
            style={imgStyle}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            preview={{
              visible: false,
              closeIcon: true,
              mask: true,
            }}
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <Image
            style={imgStyle}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <Image
            style={imgStyle}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </h3>
      </div>
    </Carousel>

    // <Carousel>
    //   <div>
    //     <h3 style={contentStyle}>
    //       <img
    //         style={imgStyle}
    //         src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    //         alt=""
    //         draggable="true"
    //       />
    //     </h3>
    //   </div>
    // </Carousel>
  )
}

export default QuestionCarousel
