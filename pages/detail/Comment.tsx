'use client'

import React, { useEffect, useState } from "react";
import styles from "styles/Detail.module.scss";

const limitLength = 200

export default function Comment(props:any){
    const { parentId } = props
    const [commentInput, setComment] = useState<string>('')
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
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

            } else {

            }
          } catch (error) {
            console.error(error);
        }
    }
    return(
        <div className={styles.comment_container}>
            <div className={styles.comment_lists}>
              
            </div>
            <div className={styles.comment_input}>
              <input value={commentInput} onChange={onChange} maxLength={limitLength}/>
              <div className={styles.number}><p>{commentInput.length}</p>/<b>{limitLength}</b></div>
              <button onClick={handleSubmit}>입력</button>
              
            </div>
        </div>
        
    )
}