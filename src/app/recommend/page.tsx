import RecommendationSystem from "@/app/_components/recommend/RecommendationSystem";
import dynamic from "next/dynamic";
import { connectDB } from "@/utils/database";
import { IData } from "@/utils/typeGroup";

interface Props {
    data: IData[];
}

const Chart = dynamic( () => import('@/app/_components/recommend/Chart'), {
    ssr : false
})

async function getData() {
    let client = await connectDB;
    const db = client.db('forum');
    let data = await db.collection('post').find().toArray();
    return { props: { data: JSON.parse(JSON.stringify(data)) } };
}

export default async function Recommend(){
    const initialData = await getData()
 
    return(
        <section className="mx-8 max-w-5xl py-20 sm:mx-auto">
            <h1 className="text-xl py-6">나만의 OTT를 확인해 봅시다~ 📺</h1>
            <div className="flex-column px-6 py-6 bg-cyan-400 mb-6 rounded-md md:flex">
                <div className="flex-1">
                    <p className="text-white text-2xl font-bold">OTT 유저 비율</p>
                </div>
                <Chart data={initialData.props.data}/>
            </div>
            <RecommendationSystem/>
        </section>
  )
}