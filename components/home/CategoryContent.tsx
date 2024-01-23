'use client'

import { useSession } from "next-auth/react";
import { Suspense, useState } from "react";
import { IData } from "utils/typeGroup";
import Pagination from "./Pagination";
import List from "./list";
import ButtonWriteIcon from "./ButtonWriteIcon";
import Capsule from "./capsule";

interface Props {
    listData: IData[];
  }

const CategoryContent = ({ listData }:Props) => {
    const { data: session } = useSession()
    const [data, setData] = useState<IData[]>(listData);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  
    // category 선택 핸들러
    const handleCategory = (id: string) => {
      if (id === "all") {
        setData(listData);
      } else {
        const filteredData = listData.filter((el) => el.category === id);
        setData(filteredData);
      }
      setCurrentPage(1);
    };
  
    // 현재 페이지에 해당하는 아이템들의 배열
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
  
    // 페이지 번호 클릭 핸들러
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setCurrentPage(Number(event.currentTarget.value));
    };
  
    // 페이지 번호 버튼 배열
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data?.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return(
        <Suspense fallback={null}>
            <Capsule onHandleCategory={handleCategory}/>
            <div className="py-2 bg-white rounded-lg shadow relative">
            {session?.user && <ButtonWriteIcon/>}
            <h5 className="text-xl px-6 py-4">우리들의 추억을 공유해 봐요 📺</h5>
            <List data={currentItems} />
            <Pagination
                pageNumbers={pageNumbers} 
                currentNumber={currentPage} 
                handleClick={handleClick}
            />
            </div>
        </Suspense>
    )
}

export default CategoryContent;