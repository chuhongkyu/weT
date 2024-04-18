import { connectDB } from '@/utils/database';
import { ObjectId } from 'mongodb';

export async function GET( request: Request, { params }: { params: { idx: string } }) {
    const client = await connectDB;
    const db = client.db('forum');
    const idx = params.idx
    try {
        // 현재 게시물 조회
        const currentPost = await db.collection('post').findOne({
            _id: new ObjectId(idx)
        });

        // 이전 게시물 조회
        const previousPostCursor = await db.collection('post')
            .find({ _id: { $lt: new ObjectId(idx) } })
            .sort({ _id: -1 }) // 내림차순 정렬
            .limit(1); // 하나만 선택

        const previousPost = await previousPostCursor.toArray();

        // 다음 게시물 조회
        const nextPostCursor = await db.collection('post')
            .find({ _id: { $gt: new ObjectId(idx) } })
            .sort({ _id: 1 }) // 오름차순 정렬
            .limit(1); // 하나만 선택

        const nextPost = await nextPostCursor.toArray();

        return Response.json({
            detailData: JSON.parse(JSON.stringify(currentPost)),
            previousPostData: previousPost[0] ? JSON.parse(JSON.stringify(previousPost[0])) : null,
            nextPostData: nextPost[0] ? JSON.parse(JSON.stringify(nextPost[0])) : null
        });

    } catch (error) {
        console.error('Error:', error);
        return Response.json({ message: `${error} Internal Server Error` });
    }
}
