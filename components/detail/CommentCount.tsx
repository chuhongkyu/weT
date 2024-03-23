'use client'

import React, { Suspense, useEffect, useState } from "react";
import { IComment } from "utils/typeGroup";

interface IProps {
    listData: IComment[];
}

export default function CommentCount({ listData }:IProps){
    const [lists, setLists] = useState(listData)
    useEffect(()=>{
        setLists(listData)
    },[lists])
    
    return(
        <Suspense fallback={null}>
            {listData?.length != 0 ?
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-base font-bold text-gray-900">댓글 <span className="text-sm">({listData?.length})</span></h2>
            </div> : null}
        </Suspense>
    )
}