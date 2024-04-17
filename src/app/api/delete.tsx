import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/database';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'DELETE') {
    try {
      const client = await connectDB;
      const db = client.db('forum');
      const result = await db.collection('post').deleteOne({_id: new ObjectId(request.body._id)});
        
      response.status(200).json({ message: '게시글 삭제 성공!' });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
