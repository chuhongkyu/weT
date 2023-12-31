import Link from "next/link";
import { IData } from "utils/typeGroup";

interface IListProps {
  data: IData[];
}

export default function List({ data }: IListProps) {
  return (
    <ul className="flex flex-col">
      {data?.map((item: IData) => (
          <li key={item._id} className="item px-6 pt-2 flex-1">
            <Link href={`/detail/${item._id}`}>
              <div className="flex items-center justify-between py-4">
                <h5 className="font-semibold text-lg">{item.title}</h5>
                <div className="text-gray-500 text-sm">
                  <p className="">{item.time}</p>
                </div>
              </div>
              <p className="text-gray-700 pb-8">{item.content.length >= 230 ? `${item.content.substring(0, 230)}...` : item.content }</p>
            </Link>
          </li>
        ))
      }
    </ul>
  );
}
