import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from 'utils/database';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'GET') {
        const client = await connectDB;
        const db = client.db('forum');
        try {
            const categoryCounts = await db.collection('post')
                .aggregate([
                    {
                        $group: {
                            _id: '$category',
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $sort: { count: -1 } // 선택적: 수량에 따라 내림차순 정렬
                    }
                ])
                .toArray();
            response.status(200).json(categoryCounts);
        }catch (error) {
            response.status(500).json({ message: '서버 에러가 발생했습니다.' });
        }
    }   
}