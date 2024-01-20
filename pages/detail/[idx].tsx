import React, { useEffect, useState } from "react";
import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { connectDB } from "utils/database";
import { useSession } from 'next-auth/react'
import Comment from "./Comment";
import MainLayOut from "components/MainLayOut";

const Detail = ({ data }:any) => {
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)
  const routes = useRouter()
  const onHandleWrite = (id: string) => {
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

  const onOpenHandle = () => {
    setOpen(!open)
  }

  useEffect(()=>{
    console.log("이메일",session?.user?.email)
  },[])

  const formattedContent = data.content.replace(/\n/g, "<br>");
    
  return (
    <MainLayOut>
      <section className="mx-8 max-w-5xl py-20 sm:mx-auto">
        <header className="mb-4 lg:mb-6 not-format">
            <div className="relative flex justify-between">
              <address className="flex items-center mb-6 not-italic">
                  <div className="inline-flex items-center mr-3 text-sm text-gray-900">
                      <img className="mr-4 w-16 h-16 rounded-full" src="/img/img_cat.webp" alt={data.email}/>
                      <div>
                          <p className="text-xl font-bold text-gray-900">{data.email ? data.email.substring(0, 10) + '...' : "익명"}</p>
                          <p className="text-base text-gray-500 dark:text-gray-400">{data.category}</p>
                          <p className="text-base text-gray-500 dark:text-gray-400">{data.title}</p>
                      </div>
                  </div>
              </address>
              {session?.user?.email == data.email &&
              <>
              <button id="dropdownComment3Button" data-dropdown-toggle="dropdownComment3"
                  onClick={onOpenHandle}
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100"
                  type="button">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                    </svg>
                  <span className="sr-only">Settings</span>
              </button>
              {/* drop down */}
              <div id="dropdownComment3"
                  className={`${open ? '': 'hidden'} top-3/4 absolute right-0 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow`}>
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownMenuIconHorizontalButton">
                      <li onClick={()=> onHandleWrite(data._id)}>
                          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">Edit</a>
                      </li>
                      <li onClick={()=> onHandleDelete(data._id)}>
                          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">Remove</a>
                      </li>
                  </ul>
              </div>
              </>}
            </div>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">{data.title}</h1>
        </header>
        
        <section className="py-4 mb-4">
          <div className="blog-from text-base" dangerouslySetInnerHTML={{ __html: formattedContent }}></div>
        </section>

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
