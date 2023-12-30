import Banner from "components/Banner";
import MainLayOut from "components/MainLayOut";
import Nav from "components/Nav";
import ButtonWriteIcon from "components/home/ButtonWriteIcon";
import Capsule from "components/home/capsule";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { connectDB } from "utils/database";
import { IData } from "utils/typeGroup";

interface Props {
  data: IData[];
}

const IndexPage = ({data: initialData }:Props) => {

  const { data: session, status } = useSession()
  const [data, setData] = useState<IData[]>(initialData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  // category 선택 핸들러
  const handleCategory = (id: string) => {
    if (id === "all") {
      setData(initialData);
    } else {
      const filteredData = initialData.filter((el) => el.category === id);
      setData(filteredData);
    }
    setCurrentPage(1); // 카테고리 변경 시 현재 페이지를 1페이지로 초기화
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
    <MainLayOut>
      <Nav/>
      <Banner/>
      <div className="mx-8 max-w-5xl py-20 sm:mx-auto">
        <h1>HOME</h1>
        <Capsule onHandleCategory={handleCategory}/>
        {!session?.user && <ButtonWriteIcon/>}
      </div>
      
    </MainLayOut>
  )
};

export const getStaticProps = async () => {
  let client = await connectDB;
  const db = client.db('forum');
  let data = await db.collection('post').find().toArray();
  return { props: { data: JSON.parse(JSON.stringify(data)) } };
};



export default IndexPage;
