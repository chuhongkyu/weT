'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { IData } from "@/utils/typeGroup";
import SkeletonList from "./SkeletonList";

interface IListProps {
  lists?: IData[];
  totalCount: number;
}

export default function HomeList({ data }: { data: IListProps}) {
  const stripHtmlTags = (htmlString:string) => {
    let strippedString = htmlString.replace(/(<([^>]+)>)/ig, '');
    strippedString = strippedString.replace(/&nbsp;/gi, ' ');

    strippedString = strippedString.replace(/&amp;/gi, '&');
    strippedString = strippedString.replace(/&lt;/gi, '<');
    strippedString = strippedString.replace(/&gt;/gi, '>');
    strippedString = strippedString.replace(/&quot;/gi, '"');
    strippedString = strippedString.replace(/&apos;/gi, "'");

    return strippedString;
  };

  return (
    <ul className="flex flex-col">
      {data?.lists?.map((item: IData) => (
          <li key={item._id + ""} className="item px-6 pt-2 flex-1 pb-8">
            <Link href={`/detail/${item._id}`}>
              <div className="py-4 md:flex items-center justify-between">
                <h5 className="font-semibold text-lg">{item.title}</h5>
                <div className="text-gray-500 text-sm flex gap-2">
                  <p className="">댓글: {item.commentsCount}</p>
                  <p className="">날짜: {item.time}</p>
                </div>
              </div>
              <div className="text-base line-clamp-3 text-ellipsis text-gray-700 no-style">{stripHtmlTags(item.content)}</div>
            </Link>
          </li>
        ))
      }
    </ul>
  );
}
