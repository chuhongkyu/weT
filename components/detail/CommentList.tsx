'use client'

import Loading from "components/Loading";
import SmallComment from "components/SmallComment";
import React, { Suspense, useEffect, useState } from "react";
import { IComment } from "utils/typeGroup";

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