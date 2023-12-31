import Banner from "components/Banner";
import MainLayOut from "components/MainLayOut";
import Nav from "components/Nav";
import ButtonWriteIcon from "components/home/ButtonWriteIcon";
import Pagination from "components/home/Pagination";
import Capsule from "components/home/capsule";
import List from "components/home/list";
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
    <MainLayOut>
      <Banner/>
      <section className="mx-8 max-w-5xl py-20 sm:mx-auto">
        <h1 className="text-xl">HOME</h1>
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
      </section>
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
