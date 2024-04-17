import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/database';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'POST') {
        const email = request.body; 
        const client = await connectDB;
        const db = client.db('forum');
        try {
            const result = await db.collection('post').find({ email }).toArray();
            response.status(200).json(result);
        }catch (error) {
            response.status(500).json({ message: '서버 에러가 발생했습니다.' });
        }
    }   
}