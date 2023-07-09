import { useSession } from "next-auth/react";
import { connectDB } from "utils/database";
import { IData } from "utils/typeGroup";
import styles from "styles/Home.module.scss";
import Nav from "components/Nav";
import Banner from "components/Banner";
import Footer from "components/Footer";
import Chart from "components/contents/Chart";
import { useState } from "react";

interface Props {
  data: IData[];
}

const Contents = ({data: initialData }:Props) => {
  const [data, setData] = useState<IData[]>(initialData);

  return (
    <div id={styles.Home}>
        <Nav/>
        <Banner/> 
        <div className={styles.wrapper}>
          <h1>Contents</h1>
          
          <div className={styles.contents_container}>
            <h5>인기 OTT 를 확인 해보세요.</h5>
            <div className={styles.chart_container}>
                <Chart data={data}></Chart>
            </div>
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

export default Contents;