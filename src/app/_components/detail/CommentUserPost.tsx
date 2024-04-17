import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { IDetail } from "@/utils/typeGroup"

const CommentUserPost = ({post}:{ post: IDetail[]}) => {
    return(
        <AnimatePresence>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{scale: 0}}
                className="absolute left-10 top-full p-4 w-55 bg-white rounded border border-solid border-cyan-500 shadow">
                <h3 className="text-base">활동 {post?.length}</h3>
                {post?.length > 0 &&
                <div className="text-sm pt-2">
                    <Link href={`/detail/${post[0]._id}`}>
                        대표 글 : {post[0].title.length > 11 ? post[0].title.substring(0, 11) + "..." : post[0].title}
                    </Link>
                </div>
                }
            </motion.div>
        </AnimatePresence>
    )
}

export default CommentUserPost