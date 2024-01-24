import MainLayOut from "components/MainLayOut";
import dynamic from "next/dynamic";
import { connectDB } from "utils/database";
import { IData } from "utils/typeGroup";
import CategoryContent  from "components/home/CategoryContent"

interface Props {
  data: IData[];
}

const Banner = dynamic(() => import('components/Banner'), { ssr: false })

const IndexPage = ({data: initialData }:Props) => {
  return(
    <MainLayOut>
      <Banner/>
      <section className="max-w-5xl py-20 sm:mx-auto">
        <h1 className="px-6 text-xl md:px-0">HOME</h1>
        <CategoryContent listData={initialData}/>
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
