'use client'

import Loading from "components/common/Loading";
import React, { Suspense, useEffect, useState } from "react";
import { IComment } from "utils/typeGroup";
import SmallComment from "./SmallComment";

interface IProps {
    listData: IComment[]
}

export default function CommentList({ listData }:IProps){
    const [lists, setLists] = useState(listData)

    useEffect(()=>{
        setLists(listData) 
    },[lists])

    return(
        <Suspense fallback={<Loading/>}>
            {lists?.map((list,key)=>{
                return(
                    <SmallComment
                        id={list._id + ""} 
                        key={key + "_list-num"}
                        comment={list.comment}
                        email={list.email}
                    />
                )
            })}
        </Suspense>
    )
}