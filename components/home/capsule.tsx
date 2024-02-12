'use client'

import { MouseEvent, useEffect, useState } from "react";
import { IData } from "utils/typeGroup";

const categoryGroup = [
    {
        id:"all",
        text:"전체",
        active: true,
        count: 0,
    },
    {
        id:"netflix",
        text:"NETFLIX",
        active: false,
        count: 0,
    },
    {
        id:"disneyplus",
        text:"DISNEY PLUS",
        active: false,
        count: 0,
    },
    {
        id:"watcha",
        text:"WATCHA",
        active: false,
        count: 0,
    },
    {
        id:"tving",
        text:"TVING",
        active: false,
        count: 0,
    },
    {
        id:"wave",
        text:"WAVE",
        active: false,
        count: 0,
    },
]

interface Props {
    onHandleCategory: (id: string) => void;
    categoryCounts: { [category: string]: number };
}

export default function Capsule({ onHandleCategory, categoryCounts }: Props){
    const [categorys, setCategory] = useState(categoryGroup);

    const onHandleCategoryClick = (event: MouseEvent<HTMLButtonElement>) =>{
        const _id = event.currentTarget.id;
        setCategory(
            categorys.map((el) => ({
              ...el,
              active: el.id === _id,
            }))
        );
        onHandleCategory(_id);
    }

    useEffect(()=>{
        setCategory(
            categorys.map((el) => ({
              ...el,
              count: categoryCounts[el.id] ||  0,
            }))
        );
    },[categoryCounts])

    return(
        <div className="overflow-x-scroll">
            <div className="space-x-5 py-4 flex pl-6 md:pl-0">
                {categorys?.map((el, index)=>{
                    return(
                        <button 
                            className={ `${el.active ? 'text-gray-100 bg-cyan-500': 'text-cyan-500' } category-btn py-2 px-5 flex whitespace-nowrap rounded-full text-sm border border-cyan-500 hover:text-gray-100 hover:bg-cyan-500 duration-300` }
                            key={el.id + index + "ID"}
                            id={el.id} 
                            onClick={(e)=> onHandleCategoryClick(e)}>
                            <p>{el.text}</p>
                            <b className="pl-1">{el.count}</b>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}