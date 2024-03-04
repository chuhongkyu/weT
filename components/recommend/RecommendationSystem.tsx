'use client'

import { useState, useEffect } from 'react';
import { MouseEvent } from 'react'
import { questions } from "utils/recommendData";
import { motion } from "framer-motion"
import Link from 'next/link';
import QuestionContainer from './QuestionContainer';

interface IScore {
    [key: string]: number;
}

interface IData {
    name: string;
    value: number;
}
  
const COLORS = ['#0088FE', '#4f81ad', '#76a2c8', '#4a5d6f','#44515ef1'];

const RecommendationSystem = () => {
    const [current, setCurrent] = useState(0)
    const [data, setData] = useState<IData []>([])
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
        if(end){
            const endData = Object.keys(score).map((key) => ({
                name: key,
                value: score[key],
            }));
            const sortedScore = endData.sort((a, b) => b.value - a.value);
            setData(sortedScore)
        }
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

    const onHandleClick = (e:MouseEvent<HTMLElement>) => {
        const target = e.currentTarget.id;
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
          
        }
    }

    return(
        <>
            {end ? 
                    (
                    <div className="border-solid border-2 border-cyan-500 rounded-md px-6 py-6 relative">
                        <h1 className="flex items-end font-semibold text-center text-xl py-4">당신에게 어울리는 OTT는 바로~ <b className="pl-2 text-2xl underline">{makeName(data[0]?.name)}</b></h1>
                        <div className="flex flex-col text-xl">
                            <span className="py-1"><b style={{color: COLORS[0] }}>1위</b> {makeName(data[0]?.name)}</span>
                            <span className="py-1"><b style={{color: COLORS[1] }}>2위</b> {makeName(data[1]?.name)}</span>
                            <span className="py-1"><b style={{color: COLORS[2]}}>3위</b> {makeName(data[2]?.name)}</span>
                        </div>
                        <div className="circle-chart pt-5">
                            <div className="flex flex-col md:flex-row">
                                {data?.map((el, index) => {
                                    return(
                                        <motion.div
                                            key={el.name + "chartKEY"}
                                            initial={{width: '0rem'}}
                                            animate={{width:`${el.value + 5}rem`, transition: {duration: 1 } }}
                                            className="h-32 flex justify-center items-center" style={{width: '0rem',  background: COLORS[index % COLORS.length]}}>
                                            <h5 className={`text-white ${index === 0 ? "text-xl": "text-sm"}`}>{makeName(el.name)}</h5>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="pt-5">
                            <h5 className="text-base pb-5">나만의 OTT를 공유해봐요~</h5>
                            <Link href={'/write'} className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                                게시판에 공유하러 가기
                            </Link>
                        </div>
                    </div>
                    ) : (
                        <QuestionContainer
                            order={current + 1}
                            amount={ques.length}
                            title={ques[current].title}
                            answer={ques[current].answer}
                            click={onHandleClick}
                        />
                    )
            }
        </>
  )
}

export default RecommendationSystem;