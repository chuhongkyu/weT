import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";
import CommentCount from "./CommentCount";
import CommentList from "./CommentList";
import { useSession } from "next-auth/react";
import CommentWrite from "./CommentWrite";

const CommentContainer = ({id}:{id:ObjectId }) => {
    const { data: session } = useSession()
    const [list, setList] = useState([])
    
    useEffect(()=>{
        getList();
    },[id])

    const getList = async() => {
        try {
            const url = `/api/comment/list?id=${id}`;
            const response = await fetch(url, { next: { revalidate: 30 } });
            if (response.ok) {
                const data = await response.json();
                setList(data)
            }else{
                throw new Error('Network response was not ok');
            }
        } catch (error) {
          console.error(error);
        }
    }

    return(
        <>
            <CommentCount data={list}/>
            {session?.user?.email && <CommentWrite parentId={id} />}
            <CommentList data={list}/>
        </>
    )
}

export default CommentContainer;