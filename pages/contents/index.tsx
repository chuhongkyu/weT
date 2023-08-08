import { useSession } from "next-auth/react";
import { connectDB } from "utils/database";
import { IData } from "utils/typeGroup";
import Nav from "components/Nav";
import Banner from "components/Banner";
import Footer from "components/Footer";
import Chart from "components/contents/Chart";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  data: IData[];
}

const Contents = ({data: initialData }:Props) => {
  const [data, setData] = useState<IData[]>(initialData);

  return (
    <div id="Content">
        <Nav/>
        <Banner/>
        <div className="wrapper">    
          <div className="contents_container recommend">
            <h5>나 에게 맞는 OTT는? </h5>
            <Link href={'/contents/recommend'} className="recommend_container">
              <Image width={300} height={300} src="/img/chart.png" alt="chart"/>
            </Link>
          </div>  
          <div className="contents_container">
            <h5>인기 OTT 를 확인 해보세요.</h5>
            <div className="chart_container">
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