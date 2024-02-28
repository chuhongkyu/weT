'use client'

import Loading from "components/Loading";
import SmallComment from "components/SmallComment";
import React, { Suspense, useEffect, useState } from "react";

const limitLength = 200

interface IComment {
    parentId: string;
}

export default function CommentWrite(props:IComment){
    const { parentId } = props;
    
    const [commentInput, setComment] = useState<string>('')
    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
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

    const handleSubmit = async () => {
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
        <form className="mb-6 bg-gray-200 rounded-lg rounded-t-lg p-4">
            <div className="relative mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                <label htmlFor="comment" className="sr-only">Your comment</label>
                <textarea 
                    id="comment"
                    value={commentInput}
                    onChange={onChange}
                    rows={4}
                    maxLength={limitLength}
                    className="py-2 px-4 w-full text-sm text-gray-900 border-0 bg-transparent focus:ring-0"
                    placeholder={"댓글 남기기"}>
                </textarea>
                <div className="absolute bottom-2 right-2 flex items-center">
                    <p className="">{commentInput.length}</p>/ 
                    <b>{limitLength}</b>
                </div>
            </div>
            <div className="flex items-center">
                <button 
                    onClick={handleSubmit}
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-cyan-500 rounded-lg focus:ring-4 focus:ring-cyan-200 hover:bg-cyan-800">
                    제출하기
                </button>
                <p className="text-xs font-medium pl-4">* 댓글은 1분 뒤 최신화 됩니다</p>
            </div>
        </form>
    )
}