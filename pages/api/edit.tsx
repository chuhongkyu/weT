import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from 'utils/database';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  console.log(request.body)
  if (request.method === 'POST') {

    try {
      const client = await connectDB;
      const db = client.db('forum');

      let newData = {
          title : request.body.title, 
          content : request.body.content,
          category : request.body.category,
          time : request.body.time,
          email : request.body.email,
        }
      const result = await db.collection('post').updateOne(
          {_id : new ObjectId(request.body._id)},
          {$set : newData}
      );

      response.status(200).json({ message: '게시글 업데이트 성공!' });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
