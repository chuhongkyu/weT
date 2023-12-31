'use client'

import SmallComment from "components/SmallComment";
import React, { useEffect, useState } from "react";
import styles from "styles/Detail.module.scss";

const limitLength = 200

interface IData {
    _id: any;
    comment: string;
    time: string;
    email: string;
    parent: any
}

export default function Comment(props:any){
    const { parentId, emailName } = props;
    const [lists, setLists] = useState<IData[]>([])
    const [commentInput, setComment] = useState<string>('')
    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        // console.log(e.target.value)
        setComment(e.target.value)
    }

    const makeTime = () => {
        const time = new Date();
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const date = time.getDate();
        const newDate = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`
        return newDate
    }

    useEffect(()=>{
        console.log(parentId)
        fetch(`/api/comment/list?id=${parentId}`,{
            method: 'GET',
        })
        .then(response => response.json())
        .then((result)=> {
            setLists(result)
            console.log(result)
            console.log(lists)
        })
    },[])

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const newTime = makeTime();
        const formData = {
            comment: commentInput,
            time: newTime,
            parent: parentId,
        }

        try {
            const response = await fetch('/api/comment/new', {
              method: 'POST',
              body: JSON.stringify(formData),
              headers: {
                'Content-Type': 'application/json'
              }
            });
        
            if (response.ok) {
                console.log(formData)
            } else {

            }
          } catch (error) {
            console.error(error);
        }
    }
    return(
        <section className="comment py-4">
            {lists?.length != 0 ?
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900">댓글 ({lists?.length})</h2>
            </div> : null}
            {emailName &&
            <form className="mb-6 bg-gray-200 rounded-lg rounded-t-lg p-4">
                <div className="relative mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                    <label htmlFor="comment" className="sr-only">Your comment</label>
                    <textarea 
                        id="comment"
                        value={commentInput}
                        onChange={onChange}
                        rows={6}
                        maxLength={limitLength}
                        className="py-2 px-4 w-full text-sm text-gray-900 border-0 bg-transparent focus:ring-0"
                        placeholder={"댓글 남기기"}>
                    </textarea>
                    <div className="absolute bottom-2 right-2 flex items-center">
                        <p className={styles.current}>{commentInput.length}</p>/ 
                        <b>{limitLength}</b>
                    </div>
                </div>
                <button 
                    onClick={handleSubmit}
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-cyan-500 rounded-lg focus:ring-4 focus:ring-cyan-200 hover:bg-cyan-800">
                    제출하기
                </button>
            </form>}
            <div>
              {lists.length > 0 ? lists.map((list,key)=>{
                  return(
                      <SmallComment 
                        id={list._id + ""} 
                        key={key + "_list-num"}
                        comment={list.comment}
                        email={list.email}
                        />
                  )
              }): null}
            </div>
            
            
        </section>  
    )
}