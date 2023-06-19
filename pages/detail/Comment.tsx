'use client'

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
        <div className={styles.comment_container}>
            <div className={styles.comment_lists}>
              {lists.length > 0 ? lists.map((list,key)=>{
                  return(
                      <div key={key + "_list-num"}>{list.comment}</div>
                  )
              }): null}
            </div>
            {emailName ? (
                <>
                <div className={styles.comment_name}>{emailName }</div>
                <div className={styles.comment_input}>
                  <textarea 
                    value={commentInput}
                    onChange={onChange}
                    rows={3}
                    maxLength={limitLength}
                    placeholder={"댓글 남기기"}
                    />
                    
                  <div className={styles.count_number}>
                      <p className={styles.current}>{commentInput.length}</p>/ 
                      <b> {limitLength}</b></div>
                </div>
                <div className={styles.btn_container}>
                    <button onClick={handleSubmit}>등록하기</button>
                </div>
                </>
            ): (<div>로그인 하러 가기</div>)}

        </div>  
    )
}