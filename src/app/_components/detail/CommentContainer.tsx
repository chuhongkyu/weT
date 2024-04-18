import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";
import CommentCount from "./CommentCount";
import CommentList from "./CommentList";
import { useSession } from "next-auth/react";
import CommentWrite from "./CommentWrite";
import { useQuery } from "@tanstack/react-query";
import { getCommentList } from "@/utils/api";
import { IComment } from "@/utils/typeGroup";


const CommentContainer = ({id}:{ id:ObjectId }) => {
    const { isPending, data, error } = useQuery({queryKey: ['comment', id], queryFn: getCommentList})
    // const { data: session } = useSession()
    if(isPending) return <div>Loading...</div>

    if(error) return <div>Loading...</div>
    return(
        <>
            <CommentCount data={data}/>
            {/* {session?.user?.email && <CommentWrite parentId={id} email={session?.user?.email} />} */}
            <CommentList data={data}/>
        </>
    )
}

export default CommentContainer;