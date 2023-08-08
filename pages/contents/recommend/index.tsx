'use client'

import Nav from "components/Nav";
import Footer from "components/Footer";
import { useState, useEffect } from 'react';
import { MouseEvent } from 'react'
import { questions } from "utils/recommendData";

interface IScore {
    [key: string]: number;
}

const Recommend = () => {
    const [current, setCurrent] = useState(0)
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
        console.log("총 문제",ques.length)
        console.log('문제', current)
    },[current])

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
            setSort();
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
            console.log(target)
        }
        console.log("update",updatedScore)
    }

    return(
    <div id="Content">
      <Nav/>
      <div className="wrapper">    
            {/* <div>
                <h1>현재</h1>
                <p>nef:{score.nef}</p>
                <p>wat:{score.wat}</p>
                <p>wav:{score.wav}</p>
                <p>tiv:{score.tiv}</p>
                <p>dis:{score.dis}</p>
            </div> */}

            {end ? 
                    <div className="quiz-container">
                        <div>끝</div>
                        <p>1위 {Object.keys(score)[0]}, {Object.values(score)[0]}</p>
                        <p>2위 {Object.keys(score)[1]}, {Object.values(score)[2]}</p>
                    </div> :
                    <div className="quiz-container" key={'ques' + current}> 
                        <h1>{ques[current].title}</h1>
                        <div className="btns-group">
                            <button onClick={onHandleClick} id='yes'><b>Yes, </b><p>{ques[current].answer.yes}</p></button>
                            <button onClick={onHandleClick} id='no'><b>No, </b><p>{ques[current].answer.no}</p></button>
                        </div>
                    </div>
            }    
        </div>
      <Footer/>
    </div>
  )
}

export default Recommend;