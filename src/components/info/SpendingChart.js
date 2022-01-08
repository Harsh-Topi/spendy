import React from 'react';
import { PieChart, Pie, Cell } from "recharts";

const colors = ["#1F65A6", "#76C3FC", "#E81E1E"]

const SpendingChart = ({limit, amountSpent, option}) => {
  const percent = (amountSpent / limit) * 100;
  console.log(percent)
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
        <Cell fill={(percent <= 100 ? colors[0] : colors[0]).toString()} />
        <Cell fill={percent <= 100 ? colors[1] : colors[2]} />
      </Pie>
      <text className="spendText" x={145} y={140} dx={5} dy={10} textAnchor="middle" >
        {`$${amountSpent} / $${limit}`}
      </text>
      <text className={`${option}Text optionText`} x={145} y={170} dx={5} dy={10} textAnchor="middle">
        {option}
      </text>
    </PieChart>
  );
}

export default SpendingChart;