'use client'
import Link from "next/link"
import { IData } from "utils/typeGroup"

interface IListProps {
    data: IData[];
}

const List = ({ data }: IListProps) => {

    return(
        <div className="grid-hot">
            <ul>
            {data
                ? data.map((item: IData) => (
                    <li key={item._id}>
                        <Link href={`/detail/${item._id}`}>
                            <h5 >{item.title}</h5>
                            
                            <div>
                                <p className="content-text">{item.content}</p>
                                <p className="content-time">{item.time}</p>
                            </div>
                        </Link>
                    </li>
                ))
                : null}
            </ul>
        </div>
    )
}

export default List