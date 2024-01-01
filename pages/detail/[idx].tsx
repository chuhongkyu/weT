import React, { useEffect } from "react";
import styles from "styles/Detail.module.scss";
import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { connectDB } from "utils/database";
import { useSession } from 'next-auth/react'
import Comment from "./Comment";
import MainLayOut from "components/MainLayOut";

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
        routes.push('/');
      } else {
        // 에러가 발생한 경우, 상세 화면으로 이동합니다.
        routes.push('/detail');
      }
    }catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    console.log("이메일",session?.user?.email)
  },[])

  const formattedContent = data.content.replace(/\n/g, "<br>");
    
  return (
    <MainLayOut>
      <section className="mx-8 max-w-5xl py-20 sm:mx-auto">
        <header className="mb-4 lg:mb-6 not-format">
            <address className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900">
                    <img className="mr-4 w-16 h-16 rounded-full" src="/img/img_cat.png" alt="Jese Leos"/>
                    <div>
                        <p className="text-xl font-bold text-gray-900">{data.email ? data.email.substring(0, 10) + '...' : "익명"}</p>
                        <p className="text-base text-gray-500 dark:text-gray-400">{data.category}</p>
                        <p className="text-base text-gray-500 dark:text-gray-400">{data.title}</p>
                    </div>
                </div>
            </address>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">{data.title}</h1>
        </header>
        
        <section className="py-4 mb-4">
          <div className="blog-from text-base" dangerouslySetInnerHTML={{ __html: formattedContent }}></div>
        </section>
        {session?.user?.email == data.email ? (
          <>
            <div className="flex gap-2">
              <button className="flex items-center justify-center p-0 w-8 h-8 bg-cyan-500 rounded-full hover:bg-cyan-600 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none" onClick={(e)=> onHandleWrite(data._id, e)}>
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 72 72" className="w-4 h-4" aria-hidden="true"><path d="M38.406 22.234l11.36 11.36L28.784 54.576l-12.876 4.307c-1.725.577-3.367-1.065-2.791-2.79l4.307-12.876L38.406 22.234zM41.234 19.406l5.234-5.234c1.562-1.562 4.095-1.562 5.657 0l5.703 5.703c1.562 1.562 1.562 4.095 0 5.657l-5.234 5.234L41.234 19.406z"/></svg>
              </button>
              <button className="flex items-center justify-center p-0 w-8 h-8 bg-cyan-500 rounded-full hover:bg-cyan-600 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none" onClick={()=> onHandleDelete(data._id)}>
                <img className="w-4 h-4" src={'/icon/delete.png'} alt="delete"/>
              </button>
            </div>
          </>
        ): null}
        <Comment parentId={data._id} emailName={session?.user?.email} />   
      </section>
    </MainLayOut>
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
