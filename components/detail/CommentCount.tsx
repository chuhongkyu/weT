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
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900">댓글 ({listData?.length})</h2>
            </div> : null}
        </Suspense>
    )
}