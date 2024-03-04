import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from 'utils/database';
import { IHomeQueryParams } from 'utils/typeGroup';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'GET') {
        const client = await connectDB;
        const db = client.db('forum');

        const { type, category, page = '1', limit = '5' }: IHomeQueryParams = request.query;

        let query = {};
        if (category) query = { ...query, category };

        const options = {
            skip: (parseInt(page) - 1) * parseInt(limit),
            limit: parseInt(limit),
        };

        let sort = {};
        if (type === 'latest') {
            sort = { time: -1 };
        } else if (type === 'old') {
            sort = { time: 1 };
        }

        try {
            // 먼저 게시글에 대한 쿼리와 페이지네이션을 수행합니다.
            const posts = await db.collection('post')
                .find(query)
                .sort(sort)
                .skip(options.skip)
                .limit(options.limit)
                .toArray();

            // 각 게시글에 대한 댓글 수를 집계합니다.
            const postsWithCommentsCount = await Promise.all(posts.map(async (post) => {
                const commentsCount = await db.collection('comment_collection')
                    .countDocuments({ parent: post._id });
                return { ...post, commentsCount };
            }));

            const totalCount = await db.collection('post').countDocuments(query);

            response.status(200).json({ lists: postsWithCommentsCount, totalCount });
        } catch (error) {
            console.error("API 호출 중 오류 발생:", error);
            response.status(500).json({ message: '서버 에러가 발생했습니다.' });
        }
    }    
}
