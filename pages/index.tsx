import MainLayOut from "components/MainLayOut";
import { connectDB } from "utils/database";
import Banner from "components/Banner";
import { IData } from "utils/typeGroup";
import CategoryContent  from "components/home/CategoryContent"
import { Db } from "mongodb";

interface Props {
  initialData: IData[];
  categoryCounts: { [category: string]: number };
}

const IndexPage = ({ initialData, categoryCounts }:Props) => {
  return(
    <MainLayOut>
      <Banner/>
      <section className="max-w-5xl py-20 sm:mx-auto">
        <h1 className="px-6 text-xl md:px-0">HOME</h1>
        <CategoryContent listData={initialData} categoryCounts={categoryCounts}/>
      </section>
    </MainLayOut>
  )
};

export const getStaticProps = async () => {
  const client = await connectDB;
  const db = client.db('forum');
  const data = await db.collection('post').find().toArray();
  const categoryCounts = await getCategoryCounts(db);
  return { props: { initialData: JSON.parse(JSON.stringify(data)), categoryCounts } };
};

const getCategoryCounts = async (db:Db) => {
  const categories = await db.collection('post').distinct('category');
  const categoryCounts:{[category: string]: number } = {};

  for (const category of categories) {
    const count = await db.collection('post').countDocuments({ category });
    categoryCounts[category] = count;
  }

   const totalCount = Object.values(categoryCounts).reduce((acc, count) => acc + count, 0);
   categoryCounts["all"] = totalCount;

  return categoryCounts;
};


export default IndexPage;
