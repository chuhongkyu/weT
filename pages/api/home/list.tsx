import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from 'utils/database';
import { IHomeQueryParams } from 'utils/typeGroup';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'GET') {
        const client = await connectDB;
        const db = client.db('forum');

        const { type, category, page = '1', limit = '5' }: IHomeQueryParams = request.query;

        let query = {};
        if (category) query = { ...query, category: category };

        const options = {
            skip: (parseInt(page) - 1) * parseInt(limit),
            limit: parseInt(limit),
        };

        let sort = {};
        if (type === 'latest') {
            sort = { time: -1 }; // 내림차순으로 정렬하여 최신순으로 결과를 반환
        } else if (type === 'old') {
            sort = { time: 1 }; // 오름차순으로 정렬하여 오래된 순으로 결과를 반환
        }

        try {
            const totalCount = await db.collection('post').countDocuments(query);
            
            const result = await db.collection('post')
                                    .find(query)
                                    .sort(sort)
                                    .skip(options.skip)
                                    .limit(options.limit)
                                    .toArray();
            response.status(200).json({ lists: result, totalCount});
        } catch (error) {
            response.status(500).json({ message: '서버 에러가 발생했습니다.' });
        }
    }    
}
