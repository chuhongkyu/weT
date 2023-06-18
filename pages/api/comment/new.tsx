import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from 'utils/database';
import { useSession } from 'next-auth/react'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    const { data: session } = useSession()
    let emailCheck = session?.user?.email
    
    if (request.method === 'POST') {
      const {  content, time, parent } = request.body;
      try {
        const client = await connectDB;
        const db = client.db('forum');
  
        const post = {
          content: content,
          time: time,
          email: emailCheck,
          parent: new ObjectId(parent),
        };
  
        const result = await db.collection('comment_collection').insertOne(post);
  
        response.status(200).json({ message: '댓글 작성 성공!' });
      } catch (error) {
        console.error(error);
        response.status(500).json({ message: '서버 에러가 발생했습니다.' });
      }
    }
  }