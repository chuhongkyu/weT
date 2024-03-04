'use client'

import { useSession } from "next-auth/react";
import ButtonWriteIcon from "./ButtonWriteIcon";
import List from "./List";
import Capsule from "./Capsule";
import { useEffect } from "react";
import { useHomeListStore } from "utils/store";
import Pagination from "./Pagination";
import CheckBoxs from "./CheckBoxs";

const MainSection = () => {
    const { data: session } = useSession();
    const { query, data, fetch } = useHomeListStore();

    useEffect(()=>{
        fetch()
    },[query])

    return(
        <section className="max-w-5xl py-10 md:py-20 sm:mx-auto">
            <h1 className="px-6 text-xl md:px-0">HOME</h1>
            <Capsule/>
            <CheckBoxs/>
            <div className="py-2 bg-white rounded-lg shadow relative">
               {session?.user && <ButtonWriteIcon/>}
                <h5 className="text-xl px-6 py-4">우리들의 추억을 공유해 봐요 📺</h5>
                <List data={data?.lists}/>
                <Pagination/>
           </div>
        </section>
    )
}

export default MainSection;