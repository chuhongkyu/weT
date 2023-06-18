import Nav from "components/Nav";
import React from "react";
import styles from "styles/Detail.module.scss";
import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { connectDB } from "utils/database";
import { useSession } from 'next-auth/react'
import Footer from "components/Footer"
import Comment from "./Comment";

const Detail = ({ data }:any) => {
  const { data: session, status } = useSession()

  const routes = useRouter()
  const onHandleWrite = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    routes.push(`/edit/${id}`);
  };

  const onHandleDelete = (id:string) =>{
    let __confirmFlag = confirm("글을 삭제하시겠습니까?"); 
    if (__confirmFlag) {
      console.log("예")
      requestDelete(id)
    }else{
      console.log("아니오")
    }
  }

  const requestDelete = async (id:string) =>{
    if(!session?.user?.email == data.email) return routes.push('/home');
    const formData = {_id: id,}
    try{
      const response = await fetch('/api/delete', {
        method: 'DELETE',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        // 성공적으로 게시글이 작성된 경우, 홈 화면으로 이동합니다.
        routes.push('/home');
      } else {
        // 에러가 발생한 경우, 상세 화면으로 이동합니다.
        routes.push('/detail');
      }
    }catch (error) {
      console.error(error);
    }
  }

  const formattedContent = data.content.replace(/\n/g, "<br>");
    
  return (
    <div id={styles.Detail}>
        <Nav/>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h1>{data.title}</h1>
            <div className={styles.container_user}>
              <span className={styles.name}>{data.email ? data.email.substring(0, 5) + '...' : "익명"}</span>
              <span className={styles.name}>{data.category}</span>
              <span className={styles.date}>{data.time}</span>
            </div>
          </div>
          
          <div className={styles.main_content}>
          <p className={styles.content} dangerouslySetInnerHTML={{ __html: formattedContent }}></p>
          </div>

          {session?.user?.email == data.email ? (
            <>
              <div className={styles.bottom}>
                <button onClick={(e)=> onHandleWrite(data._id, e)} className={styles.edit_btn}>
                  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 72 72" width="64px" height="64px"><path d="M38.406 22.234l11.36 11.36L28.784 54.576l-12.876 4.307c-1.725.577-3.367-1.065-2.791-2.79l4.307-12.876L38.406 22.234zM41.234 19.406l5.234-5.234c1.562-1.562 4.095-1.562 5.657 0l5.703 5.703c1.562 1.562 1.562 4.095 0 5.657l-5.234 5.234L41.234 19.406z"/></svg>
                </button>
                <button onClick={()=> onHandleDelete(data._id)} className={styles.delete_btn}>
                  <img src={'/icon/delete.png'} alt="delete"/>
                </button>
              </div>
            </>
          ): null}
          {session?.user?.email ? (
            <Comment parentId={data._id} />
          ): null}
          
          
        </div>
        <Footer/>
    </div>
  )
}

export async function getStaticPaths() {
    const client = await connectDB;
    const db = client.db('forum');
    const posts = await db.collection('post').find({}).toArray();
  
    const paths = posts.map((post) => ({
      params: { idx: post._id.toString() },
    }));
  
    return { paths, fallback: false };
}

export async function getStaticProps({ params }:any) {
    const client = await connectDB;
    const db = client.db('forum');
    const data = await db.collection('post').findOne({
        _id : new ObjectId(params.idx)
    });
  
    return { props: { data: JSON.parse(JSON.stringify(data)) } };
}

export default Detail;
