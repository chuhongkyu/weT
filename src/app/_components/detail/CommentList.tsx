'use client'

import React, { useEffect, useState } from "react";
import { IComment } from "@/utils/typeGroup";
import SmallComment from "./SmallComment";

interface IProps {
    data: IComment[]
}

export default function CommentList({ data }:IProps){
    const [list, setList] = useState(data)

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