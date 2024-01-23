'use client'

import Link from "next/link";
import { IData } from "utils/typeGroup";

interface IListProps {
  data: IData[];
}

export default function List({ data }: IListProps) {
  return (
    <ul className="flex flex-col">
      {data?.map((item: IData) => (
          <li key={item._id} className="item px-6 pt-2 flex-1 pb-8">
            <Link href={`/detail/${item._id}`}>
              <div className="py-4 md:flex items-center justify-between">
                <h5 className="font-semibold text-lg">{item.title}</h5>
                <div className="text-gray-500 text-sm">
                  <p className="">{item.time}</p>
                </div>
              </div>
              <div className="text-base line-clamp-3 text-ellipsis text-gray-700 no-style" dangerouslySetInnerHTML={{__html: item.content}}></div>
            </Link>
          </li>
        ))
      }
    </ul>
  );
}
