'use client'

import React, { useEffect, useState } from "react";
import { Pie, PieChart, Cell, Tooltip, Legend } from "recharts";
import { IData } from "utils/typeGroup";

interface IChart {
    category: string;
    number: number;
}

interface IProps {
    data: IData[]
}

const COLORS = ['#1509f1', '#0088FE', '#1f1e1e', '#ed0154', '#d51d01'];

const style = {
    top: 30,
    left: 0,
    lineHeight: "24px"
};


const Chart = ({data}:IProps) => {
    const [dummy, setDummy] = useState<IData[]>(data)
    const [chart, setChart] = useState(
        [
            {
                category: "wave",
                number: 0
            },
            {
                category: "disneyplus",
                number: 0
            },
            {
                category: "netflix",
                number: 0
            },
            {
                category: "tving",
                number: 0
            },
            {
                category: "watcha",
                number: 0
            },
        ])

    useEffect(()=>{
        setChart([
            {
                category: "wave",
                number: dummy.filter(el => el.category === "wave").length
            },
            {
                category: "disney plus",
                number: dummy.filter((el)=> el.category == "disney plus").length
            },
            {
                category: "netflix",
                number: dummy.filter((el)=> el.category == "netflix").length
            },
            {
                category: "tving",
                number: dummy.filter((el)=> el.category == "tving").length
            },
            {
                category: "watcha",
                number: dummy.filter((el)=> el.category == "watcha").length
            },
        ])
    },[data])

    return (
        <PieChart className="flex-1" width={300} height={220}>
        <Pie
          data={chart}
          cx={100}
          cy={100}
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={1}
          dataKey="number"
        >
          {chart.map((entry:IChart, index:number) => (
            <Cell id={`cell-${entry.category}`} key={`cell-${entry.category}`} name={entry.category.toUpperCase()} fill={COLORS[index % COLORS.length]}/>
          ))}
        </Pie>
        <Legend
            iconSize={10}
            width={150}
            height={140}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={style}
        />
        <Tooltip />
    </PieChart>
  );
}

export default Chart;