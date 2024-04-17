import { ObjectId } from 'mongodb';
import { connectDB } from '@/utils/database';

export async function GET() {
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
        return Response.json(categoryCounts)
    }catch (error) {
        return new Response(`Webhook error: ${error}`, {
            status: 400,
        })
    }
}