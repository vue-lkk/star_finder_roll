import React, { FC, useMemo } from 'react'
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { STAT_COLORS } from '../../../constant'
import { QuestionRadioStatPropsType } from './interface'

const StatComponent: FC<QuestionRadioStatPropsType> = ({
  stat = [],
}) => {
  // count 求和
  const sum = useMemo(() => {
    let s = 0
    stat.forEach(i => (s += i.count))
    return s
  }, [stat])

  // 格式化
  function format(n: number) {
    return ((n / sum) * 100).toFixed(2)
  }

  return (
    <div style={{ width: '400px', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="count"
            isAnimationActive={true}
            data={stat}
            cx="50%" // x轴偏移
            cy="50%" // y轴偏移
            outerRadius={80} // 饼图的直径
            fill="#8884d8"
            label={i => `${i.name}:${format(i.count)}%`}
          >
            {stat.map((i, index) => {
              return (
                <Cell
                  key={index}
                  fill={STAT_COLORS[index]}
                ></Cell>
              )
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatComponent
