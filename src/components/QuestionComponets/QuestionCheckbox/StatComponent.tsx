import React, { FC, useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { QuestionCheckboxStatPropsType } from './interface'

const getIntroOfPage = (label: any) => {
  if (label === 'Page A') {
    return "Page A is about men's clothing"
  }
  if (label === 'Page B') {
    return "Page B is about women's dress"
  }
  if (label === 'Page C') {
    return "Page C is about women's bag"
  }
  if (label === 'Page D') {
    return 'Page D is about household goods'
  }
  if (label === 'Page E') {
    return 'Page E is about food'
  }
  if (label === 'Page F') {
    return 'Page F is about baby food'
  }
  return ''
}

const CustomTooltip = () => {
  // if (active && payload && payload.length) {
  //   return (
  //     <div className="custom-tooltip">
  //       <p className="label">{`${label} : ${payload[0].value}`}</p>
  //       <p className="intro">{getIntroOfPage(label)}</p>
  //       <p className="desc">
  //         Anything you want can be displayed here.
  //       </p>
  //     </div>
  //   )
  // }

  return null
}

const StatComponent: FC<QuestionCheckboxStatPropsType> = ({
  stat = [],
}) => {
  return (
    <div style={{ width: '400px', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={stat}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="count"
            barSize={20}
            fill="#8884d8"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatComponent
