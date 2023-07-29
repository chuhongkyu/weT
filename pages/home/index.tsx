import { useSession } from "next-auth/react";
import { connectDB } from "utils/database";
import { IData } from "utils/typeGroup";
import styles from "styles/Home.module.scss";
import Nav from "components/Nav";
import Banner from "components/Banner";
import Capsule from "components/home/capsule";
import ButtonWrite from "components/home/ButtonWrite";
import List from "components/home/list";
import Pagination from "components/home/Pagination";
import Footer from "components/Footer";
import { useState } from "react";

interface Props {
  data: IData[];
}

const Home = ({data: initialData }:Props) => {
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
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 번호 클릭 핸들러
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(Number(event.currentTarget.value));
  };

  // 페이지 번호 버튼 배열
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div id={styles.Home}>
        <Nav/>
        <Banner/> 
        <div className={styles.wrapper}>
          <h1 className="head-line-2">HOME</h1>
          <Capsule onHandleCategory={handleCategory}/>
          {session ? <ButtonWrite/> : null}
          <div className={styles.list_container}>
            <h5 className={styles.description}>
              우리들의 추억을 공유해 봐요 📺
            </h5>
            <List data={currentItems} />
            <Pagination
              pageNumbers={pageNumbers} 
              currentNumber={currentPage} 
              handleClick={handleClick}
            />
          </div>
          
        </div>
        <Footer/>
    </div>
  )
}

export const getStaticProps = async () => {
  let client = await connectDB;
  const db = client.db('forum');
  let data = await db.collection('post').find().toArray();
  return { props: { data: JSON.parse(JSON.stringify(data)) } };
};

export default Home;