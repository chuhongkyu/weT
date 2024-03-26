import React, { useEffect, useState } from "react";
import { HomeListStoreState, useHomeListStore } from "utils/store";
import { IData } from "utils/typeGroup";

interface IProps extends HomeListStoreState{
    data: IListProps
}

interface IListProps {
    list?: IData[];
    totalCount: number;
}

export default function Pagination({query, setQuery, data}:IProps){
    const [ pageNumbers, setPageNumbers] = useState<number[]>([]);

    const makePages = (totalCount: number, itemsPerPage: number): number[] => {
        const numberOfPages = Math.ceil(totalCount / itemsPerPage);
        const pages = Array.from({ length: numberOfPages }, (_, index) => index + 1);
        return pages;
    };

    useEffect(() => {
        if (data?.totalCount) {
            const pageArray = makePages(data.totalCount, 5);
            setPageNumbers(pageArray);
        }
    }, [data]);

    const onHandlePage = (e: React.MouseEvent<HTMLButtonElement>) => {
        const current = e.currentTarget.value;
        setQuery({...query, page: current})
    }

    return(
        <div className="py-4 flex justify-center">
            <ul className="flex gap-3 text-sm">
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            className={`text-gray-600 ${Number(query?.page) === number ? '' : 'opacity-50'}`   }
                            value={number}
                            onClick={onHandlePage}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}