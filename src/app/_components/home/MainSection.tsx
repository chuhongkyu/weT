'use client'

import ButtonWriteIcon from "./ButtonWriteIcon";
import HomeList from "./HomeList";
import HomeCapsule from "./HomeCapsule";
import { useEffect } from "react";
import { useHomeListStore } from "@/utils/store";
import Pagination from "./Pagination";
import CheckBoxs from "./CheckBoxs";
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { getHomeList } from "@/utils/api";
import SkeletonList from "./SkeletonList";


const MainSection = () => {

    const { query, setQuery } = useHomeListStore();
    const { isPending, data, error } = useQuery({ queryKey: ['list', query], queryFn: getHomeList})
    console.log(data)
    return(
        <section className="max-w-5xl md:pb-20 sm:mx-auto">
            {/* <h1 className="px-6 text-xl md:px-0">HOME</h1> */}
            <HomeCapsule query={query} setQuery={setQuery}/>
            <CheckBoxs query={query} setQuery={setQuery}/>
            <div className="py-2 bg-white rounded-lg shadow relative">
               {/* {session?.user && <ButtonWriteIcon/>} */}
                <h5 className="text-xl px-6 py-4">우리들의 추억을 공유해 봐요 📺</h5>
                {isPending ? 
                    <SkeletonList />: <HomeList data={data}/>
                }
                <Pagination query={query} setQuery={setQuery} data={data}/>
            </div>
        </section>
    )
}

export default MainSection;