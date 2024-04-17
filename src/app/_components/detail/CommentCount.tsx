'use client'

import { IComment } from "@/utils/typeGroup";

interface IProps {
    data: IComment[]
}

export default function CommentCount({data}:IProps){
    
    return(
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-gray-900">댓글 <span className="text-sm">({data?.length})</span></h2>
        </div>
    )
}