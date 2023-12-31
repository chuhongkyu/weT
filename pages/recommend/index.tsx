import { useState, useEffect } from 'react';
import { MouseEvent } from 'react'
import { questions } from "utils/recommendData";
import { PieChart, ResponsiveContainer, Pie, Cell } from "recharts";
import MainLayOut from "components/MainLayOut";

interface IScore {
    [key: string]: number;
}
  
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }:any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
};

const Recommend = () => {
    const [current, setCurrent] = useState(0)
    const [data, setData] = useState([
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
    ])
    const [ques, setQues] = useState(questions)
    const [end, setEnd] = useState(false);
    const [score, setScore] = useState<IScore>(
        {
            nef: 0,
            wat: 0,
            wav: 0,
            tiv: 0,
            dis: 0,
        }
    );

    useEffect(()=>{

        const endData = [
            { name: Object.keys(score)[0], value: Object.values(score)[0] },
            { name: Object.keys(score)[1], value: Object.values(score)[1] },
            { name: Object.keys(score)[2], value: Object.values(score)[2] },
        ]
        if(end){
            setSort()
            setData(endData)
        }

        console.log(
           "1", Object.keys(score)[0], Object.values(score)[0],
           "2", Object.keys(score)[1], Object.values(score)[1],
           "4", Object.keys(score)[3], Object.values(score)[3]
        )
    },[end])

    const makeName = (title:string) =>{
        let data = title
        switch(title){
            case 'nef':
                data = "NETFLIX"
                break;
            case 'wat':
                data = "WATCHA"
                break;
            case 'wav':
                data = "WAVE"
                break;
            case 'tiv':
                data = "TVING"
                break;
            case 'dis':
                data = "DISNEY PLUS"
                break;
        }
        return data
    }

    const setSort = () => {
        const sortedScore = Object.fromEntries(
            Object.entries(score).sort(([, valueA], [, valueB]) => valueB - valueA)
        );
        setScore(sortedScore);
    }

    const onHandleClick = (e:MouseEvent<HTMLElement>) => {
        const target = e.currentTarget.id;
        let updatedScore;

        if(current < ques.length -1){
            setCurrent((prev) => prev + 1)
        }else{
            setEnd(true);
        }

        if(target == 'yes'){
            const updatedScore = {
                nef: score.nef + ques[current].score.yes.nef,
                wat: score.wat + ques[current].score.yes.wat,
                wav: score.wav + ques[current].score.yes.wav,
                tiv: score.tiv + ques[current].score.yes.tiv,
                dis: score.dis + ques[current].score.yes.dis,
            };
            setScore(updatedScore)
        }else if(target == 'no'){
            const updatedScore = {
                nef: score.nef + ques[current].score.no.nef,
                wat: score.wat + ques[current].score.no.wat,
                wav: score.wav + ques[current].score.no.wav,
                tiv: score.tiv + ques[current].score.no.tiv,
                dis: score.dis + ques[current].score.no.dis,
            };
            setScore(updatedScore)
        }else{
            // console.log(target)
        }
        // console.log("update",updatedScore)
    }

    return(
        <MainLayOut>
            <section className="mx-8 max-w-5xl py-20 sm:mx-auto">
                <h1 className="text-xl py-6">나만의 OTT를 확인해 봅시다~ 📺</h1>
                {end ? 
                        (
                        <div className="border-solid border-2 border-cyan-500 rounded-md px-6 py-6 relative">
                            <h1 className="flex items-end font-semibold text-center text-xl py-4">당신에게 어울리는 OTT는 바로~ <b className="pl-2 text-2xl underline">{makeName(Object.keys(score)[0])}</b></h1>
                            <div className="flex flex-col text-xl">
                                <span className="py-2"><b style={{color: "#0088FE" }}>1위</b> {makeName(Object.keys(score)[0])}</span>
                                <span className="py-2"><b style={{color: "#00C49F" }}>2위</b> {makeName(Object.keys(score)[1])}</span>
                                <span className="py-2"><b style={{color: "#FFBB28" }}>3위</b> {makeName(Object.keys(score)[2])}</span>
                            </div>
                            <div className="circle-chart">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart width={300} height={300}>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {data.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        ) : (
                        <div className="border-solid border-2 border-cyan-500 rounded-md px-6 py-6" key={'ques' + current}> 
                            <span className="flex text-base gap-2 font-bold"><p>0{current + 1}</p>/<p>0{ques.length}</p></span>
                            <h1 className="font-semibold text-center text-xl py-4">{ques[current].title}</h1>
                            <div className="flex items-center gap-5 pt-6">
                                <button className="flex-1 bg-gray-100 rounded-md py-4 hover:bg-white border-solid border" onClick={onHandleClick} id='yes'><b className="text-lg pt-4 pb-2">Yes, </b><p className="text-base pt-2 pb-4">{ques[current].answer.yes}</p></button>
                                <button className="flex-1 bg-gray-100 rounded-md py-4 hover:bg-white border-solid border" onClick={onHandleClick} id='no'><b className="text-lg pt-4 pb-2">No, </b><p className="text-base pt-2 pb-4">{ques[current].answer.no}</p></button>
                            </div>
                        </div>
                        )
                }
            </section>
        </MainLayOut>
  )
}

export default Recommend;