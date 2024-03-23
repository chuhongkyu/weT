import Link from "next/link";
import { IDetail } from "utils/typeGroup";

const OtherPost = ({previousData, nextData}: {previousData: IDetail, nextData: IDetail}) => {
    return(
        <section className="py-4 mb-4">
            <div className="py-2 bg-white">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 pb-5">다른 글 보기</h2>
                <ul className="block">
                    {previousData &&
                        <li className="item py-2 flex-1">
                            <Link href={`/detail/${previousData._id}`}>
                                <div className="py-2 flex">
                                    <p className="pr-2 font-bold">이전 글</p>
                                    <p>{previousData.title.length > 18 ? previousData.title.substring(0,18) + "..." : previousData.title}</p>
                                </div>
                            </Link>
                        </li>
                    }
                    {nextData &&
                        <li className="item py-2 flex-1">
                            <Link href={`/detail/${nextData._id}`}>
                                <div className="py-2 flex">
                                    <p className="pr-2 font-bold">다음 글</p>
                                    <p>{nextData.title.length > 18 ? nextData.title.substring(0,18) + "..." : nextData.title}</p>
                                </div>
                            </Link>
                        </li>
                    }
                </ul>
            </div>
        </section>
    )
}

export default OtherPost;