'use client'

import { MouseEvent, useEffect, useState } from "react";

const categoryGroup = [
    {
        id:"all",
        text:"전체",
        active: true,
    },
    {
        id:"netflix",
        text:"NETFLIX",
        active: false,
    },
    {
        id:"disney plus",
        text:"DISNEY PLUS",
        active: false,
    },
    {
        id:"watcha",
        text:"WATCHA",
        active: false,
    },
    {
        id:"tving",
        text:"TVING",
        active: false,
    },
    {
        id:"wave",
        text:"WAVE",
        active: false,
    },
]

interface Props {
    onHandleCategory: (id: string) => void;
}

export default function Capsule({ onHandleCategory }: Props){
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
    
    useEffect(() => {
    }, [categorys]);

    return(
        <div className="overflow-x-scroll">
            <div className="space-x-5 py-4 flex pl-6 md:pl-0">
                {categorys?.map((el, index)=>{
                    return(
                        <button 
                            className="py-2 px-5 whitespace-nowrap rounded-full text-sm text-cyan-500 hover:text-gray-100 border border-cyan-500 hover:bg-cyan-500 duration-300"
                            key={el.id + index + "ID"}
                            id={el.id} 
                            onClick={(e)=> onHandleCategoryClick(e)}>
                            {el.text}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}