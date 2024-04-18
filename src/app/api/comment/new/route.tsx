import { ObjectId } from 'mongodb';
import { connectDB } from '@/utils/database';


export default async function POST(request: Request) {
    const { comment, time, parent, email } = request.body;
    
    try {
      const client = await connectDB;
      const db = client.db('forum');

      const post = {
        comment: comment,
        time: time,
        email: email,
        parent: new ObjectId(parent),
      };

      const result = await db.collection('comment_collection').insertOne(post);

      return Response.json({ message: '댓글 작성 성공!' })
    } catch (error) {
      console.error(error);
      return Response.json({ message: '서버 에러가 발생했습니다.' })
    }
  }