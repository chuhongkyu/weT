'use client'

import React, { useEffect, useState } from "react";
import { IComment } from "@/utils/typeGroup";
import SmallComment from "./SmallComment";

export default function CommentList({data}:{data: IComment[]}){
    const [ list, setList] = useState<IComment[]>([])
    useEffect(()=>{
        setList(data)
    },[data])

    return(
        <>
            {list?.map((item,key)=>{
                return(
                    <SmallComment
                        id={item._id + ""} 
                        key={key + "_list-num"}
                        comment={item.comment}
                        email={item.email}
                    />
                )
            })}
        </>
    )
}