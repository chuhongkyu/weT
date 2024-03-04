import { MouseEvent } from "react";

interface IQuestionProps{
    order:number;
    amount:number; 
    title:string;
    answer:{
        yes:string;
        no:string;
    };
    click:(e:MouseEvent<HTMLElement>)=> void
}

export default function QuestionContainer({order, amount, title, answer, click}:IQuestionProps){
    return(
        <div className="border-solid border-2 border-cyan-500 rounded-md px-6 py-6" key={'ques' + order}> 
            <span className="flex text-base gap-2 font-bold"><p>0{order}</p>/<p>0{amount}</p></span>
            <h1 className="font-semibold text-center text-xl py-4">{title}</h1>
            <div className="flex items-stretch gap-5 pt-6">
                <button className="flex-1 bg-gray-100 rounded-md px-2 py-4 border-solid border md:px-0 md:hover:bg-white" onClick={click} id='yes'><b className="text-lg pt-4 pb-2">Yes, </b><p className="text-base pt-2 pb-4">{answer.yes}</p></button>
                <button className="flex-1 bg-gray-100 rounded-md px-2 py-4 border-solid border md:px-0 md:hover:bg-white" onClick={click} id='no'><b className="text-lg pt-4 pb-2">No, </b><p className="text-base pt-2 pb-4">{answer.no}</p></button>
            </div>
        </div>
    )
}