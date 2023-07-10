'use client'

import React, { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from "recharts";
import { IData } from "utils/typeGroup";

const Chart = (data:any) => {
    const [dummy, setDummy] = useState<IData[]>(data.data)
    const [chart, setChart] = useState(
        [
            {
                category: "wave",
                number: 0
            },
            {
                category: "disney plus",
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
    <RadarChart
        id={"CHART"}
        cx={200}
        cy={200}
        outerRadius={100}
        width={400}
        height={400}
        data={chart}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="category" />
      <PolarRadiusAxis />
      <Radar name="계시글 수" dataKey="number" stroke="#17a7ce" fill="#17a7ce" fillOpacity={0.6} />
      {/* <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} /> */}
      <Legend />
    </RadarChart>
  );
}

export default Chart;