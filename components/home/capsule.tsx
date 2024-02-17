'use client'

import { MouseEvent, useEffect, useState } from "react";
import { getCountList } from "utils/api";
import { useHomeListStore } from "utils/store";


interface CategoryCount {
    _id: string;
    count: number;
}

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

export default function Capsule(){
    const [ categorys, setCategories ] = useState(categoryGroup);
    const { query, setQuery } = useHomeListStore();

    const onHandleCategoryClick = (event: MouseEvent<HTMLButtonElement>) =>{
        const _id = event.currentTarget.id;
        setCategories(
            categorys.map((el) => ({
              ...el,
              active: el.id === _id,
            }))
        );
        setQuery({ ...query, page: '1', category: _id === "all" ? undefined : _id });
    }

    useEffect(() => {
        const updateCategoryCounts = async () => {
            const counts:CategoryCount[] = await getCountList();
            
            if (counts) {
                const allCount = counts.reduce((acc, curr) => acc + curr.count, 0);
                setCategories((currentCategories) => 
                    currentCategories.map((category) => {
                        if (category.id === "all") {
                            return { ...category, count: allCount };
                        }
                        return ({
                            ...category,
                            count: counts.find((c) => c._id === category.id)?.count || 0,
                        })
                    })
                );
            }
        };

        updateCategoryCounts();
    }, []);

    return(
        <div className="overflow-x-scroll md:overflow-x-hidden">
            <div className="space-x-2 pt-4 flex pl-6 md:pl-0 md:space-x-5">
                {categorys?.map((el, index)=>{
                    return(
                        <button 
                            className={ `${el.active ? 'text-gray-100 bg-cyan-500': 'text-cyan-500' } category-btn pt-2 pb-1.5 px-5 flex whitespace-nowrap rounded-full text-sm border border-cyan-500 hover:text-gray-100 hover:bg-cyan-500 duration-300` }
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