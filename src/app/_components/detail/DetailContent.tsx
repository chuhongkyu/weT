"use client";

import { getCommentList, getDetailList } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"
import Loading from "../common/Loading";
import { Suspense } from "react";
import CommentContainer from "./CommentContainer";
import OtherPost from "./OtherPost";

export default function DetailContent ({ idx }: { idx: string}) {
    console.log('d',idx)
    const { isPending, data, error } = useQuery({queryKey: ['detail', idx], queryFn: getDetailList})

    if(isPending){
        return <></>
    }

    if(error){
        return <div>error...</div>
    }

    return(
        <>
        <header className="mb-4 lg:mb-6 not-format">
            <div className="relative flex justify-between">
              <address className="flex items-center mb-6 not-italic">
                  <div className="inline-flex items-center mr-3 text-sm text-gray-900">
                      <img className="mr-4 w-16 h-16 rounded-full" src="/img/img_cat.jpg" alt={data.detailData?.email}/>
                      <div>
                          <p className="text-xl font-bold text-gray-900">{data.detailData?.email ? data.detailData?.email.substring(0, 10) + '...' : "익명"}</p>
                          <p className="text-base text-gray-500 dark:text-gray-400">{data.detailData?.category}</p>
                          <p className="text-base text-gray-500 dark:text-gray-400">{data.detailData?.title}</p>
                      </div>
                  </div>
              </address>
              {/* {/* {session?.user?.email == detailData?.email &&
              <OpenBtn id={detailData?._id + ""} onHandleDelete={onHandleDelete} onHandleWrite={onHandleWrite}/>
              } */}
            </div>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">{data.detailData?.title}</h1>
        </header>
        <section className="py-4 mb-4">
            <div className="blog-from text-base" dangerouslySetInnerHTML={{ __html: data.detailData?.content}}></div>
        </section>
        <section className="comment py-4">
          <Suspense fallback={<Loading/>}>
            <CommentContainer id={data.detailData?._id}/>
          </Suspense>
        </section>

        <OtherPost previousData={data.previousPostData} nextData={data.nextPostData}/>
        </>
    )
}