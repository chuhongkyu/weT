import { ObjectId } from 'mongodb';
import { connectDB } from '@/utils/database';

export default async function POST(request: Request) {
    const email = request.body; 
    const client = await connectDB;
    const db = client.db('forum');
    try {
        const result = await db.collection('post').find({ email }).toArray();
        return Response.json(result)
    }catch (error) {
        return Response.json({ message: '서버 에러가 발생했습니다.' })
    }
}