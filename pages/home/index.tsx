import Link from "next/link";
import { useSession } from "next-auth/react";
import { connectDB } from "utils/database";
import { IData } from "utils/typeGroup";
import styles from "styles/Home.module.scss";
import Banner from "components/Banner";
import Nav from "components/Nav";
import List from "components/home/list";
import Footer from "components/Footer"
import Capsule from "components/home/capsule"
import { useState } from "react";

interface Props {
  data: IData[];
}

const Home = ({data: initialData }:Props) => {
  const { data: session, status } = useSession()
  const [data, setData] = useState<IData[]>(initialData);

  // category 선택 핸들러
  const handleCategory = (id: string) => {
    if (id === 'all') {
      setData(initialData);
    } else {
      const filteredData = initialData.filter((el) => el.category === id);
      setData(filteredData);
    }
  };

  return (
    <div id={styles.Home}>
        <Nav/>
        <Banner/> 
        <div className={styles.wrapper}>
          <h1>HOME</h1>
          <Capsule onHandleCategory={handleCategory}/>
          {session ? <div className={styles.write_btn}>
              <Link href={'/write'}>
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 64 64" width="48px" height="48px"><path d="M32,10c12.15,0,22,9.85,22,22s-9.85,22-22,22s-22-9.85-22-22S19.85,10,32,10z M40,34c1.104,0,2-0.895,2-2	c0-1.105-0.896-2-2-2c-0.248,0-2.913,0-6,0c0-3.087,0-5.752,0-6c0-1.104-0.895-2-2-2c-1.104,0-2,0.896-2,2c0,0.248,0,2.913,0,6	c-3.087,0-5.752,0-6,0c-1.104,0-2,0.895-2,2c0,1.105,0.896,2,2,2c0.248,0,2.913,0,6,0c0,3.087,0,5.752,0,6c0,1.104,0.896,2,2,2	c1.105,0,2-0.896,2-2c0-0.248,0-2.913,0-6C37.087,34,39.752,34,40,34z"/></svg>
              </Link>
          </div> : null}
          
          <List data={data} />
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