'use client'

import { IComment } from "@/utils/typeGroup"

export default function CommentCount({data}:{data: IComment[]}){
    return(
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-gray-900">댓글 <span className="text-sm">({data?.length})</span></h2>
        </div>
    )
}