import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function SalaryBarChart (props) {
  return (
    <div style={{width:'100%', height:`${60 * props.data.length}px`}}>
      <ResponsiveContainer height="100%">
        <BarChart 
          data={props.data} 
          layout="vertical"
          margin={props.margin}
        >
          <XAxis type="number" allowDecimals={false}/>
          <YAxis type="category" dataKey="name" tickMargin='10'/>
          <CartesianGrid horizontal={false}/>
          <Tooltip/>
          <Legend payload={[{ value: props.legendLabel, type: 'line' }]} align='center'/>
          <Bar dataKey="count" fill="rgba(53, 58, 64, 0.615)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};