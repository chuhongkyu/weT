import MainLayOut from "components/MainLayOut";
import RecommendSystem from "components/recommend/recommendSystem";
import dynamic from "next/dynamic";
import { connectDB } from "utils/database";
import { IData } from "utils/typeGroup";

interface Props {
    data: IData[];
}

const Chart = dynamic( () => import('components/recommend/Chart'), {
    ssr : false
})

const Recommend = ({data: initialData }:Props) => {
    return(
        <MainLayOut>
            <section className="mx-8 max-w-5xl py-20 sm:mx-auto">
                <h1 className="text-xl py-6">나만의 OTT를 확인해 봅시다~ 📺</h1>
                <div className="flex px-6 py-6 bg-cyan-400 mb-6 rounded-md">
                    <div className="flex-1 ">
                        <p className="text-white text-2xl font-bold">OTT 유저 비율</p>
                    </div>
                    <Chart data={initialData}/>
                </div>
                <RecommendSystem/>
            </section>
        </MainLayOut>
  )
}

export const getStaticProps = async () => {
    let client = await connectDB;
    const db = client.db('forum');
    let data = await db.collection('post').find().toArray();
    return { props: { data: JSON.parse(JSON.stringify(data)) } };
};

export default Recommend;