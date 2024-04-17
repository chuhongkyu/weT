import { connectDB } from '@/utils/database';
import { ObjectId } from 'mongodb';
import { NextRequest } from 'next/server';

export async function GET( { params }: { params: { idx: string } }) {
    const idx = params.idx
    const client = await connectDB;
    const db = client.db('forum');

    try {
      // 현재 게시물 조회
      const currentPost = await db.collection('post').findOne({
        _id: new ObjectId(idx)
      });

      // 이전 게시물 조회
      const previousPost = await db.collection('post')
        .find({ _id: { $lt: new ObjectId(idx) } })
        .sort({ _id: -1 }) // 내림차순 정렬
        .limit(1) // 하나만 선택
        .toArray();

      // 다음 게시물 조회
      const nextPost = await db.collection('post')
        .find({ _id: { $gt: new ObjectId(idx) } })
        .sort({ _id: 1 }) // 오름차순 정렬
        .limit(1) // 하나만 선택
        .toArray();

      return Response.json({
        detailData: JSON.parse(JSON.stringify(currentPost)),
        previousPostData: previousPost[0] ? JSON.parse(JSON.stringify(previousPost[0])) : null,
        nextPostData: nextPost[0] ? JSON.parse(JSON.stringify(nextPost[0])) : null
      })

    } catch (error) {
      console.error('Error:', error);
      return Response.json({ message: `${error} Internal Server Error` })
    }
}