import React, { useEffect, useState } from "react";
import { useHomeListStore } from "utils/store";

export default function Pagination(){
    const { query, setQuery, data } = useHomeListStore();
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