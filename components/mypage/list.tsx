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
          <li key={item._id} className="item flex-1">
            <Link href={`/detail/${item._id}`}>
              <div className="py-4 md:flex items-center justify-between">
                <h5 className="font-semibold text-lg">{item.title.length >= 19 ? item.title.substring(0,19) + "..." : item.title}</h5>
                <div className="text-gray-500 text-sm">
                  <p className="">{item.time}</p>
                </div>
              </div>
            </Link>
          </li>
        ))
      }
    </ul>
  );
}
