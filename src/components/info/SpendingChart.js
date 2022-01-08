import React from 'react';
import { PieChart, Pie, Cell } from "recharts";



const colors = ["#1F65A6", "#76C3FC"]

const SpendingChart = ({limit, amountSpent, option}) => {
  const percent = (amountSpent / limit) * 100;
  const pieValue = 100 - percent;
  //const selected = option.chartAt(0).toUpperCase() + option.slice(1);

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={[{value: percent}, {value: pieValue}]}
        innerRadius={120}
        outerRadius={150}
        fill="#8884d8"
        startAngle={90}
        endAngle={-270}
        paddingAngle={0}
        dataKey="value"
      >
        <Cell fill={colors[0]} />
        <Cell fill={colors[1]} />
      </Pie>
      <text x={145} y={140} dx={5} dy={10} textAnchor="middle" fill={"BLACK"}>
        {`$${amountSpent} / $${limit}`}
      </text>
      <text x={145} y={160} dx={5} dy={10} textAnchor="middle" fill={"BLACK"}>
        {option}
      </text>
    </PieChart>
  );
}

export default SpendingChart;