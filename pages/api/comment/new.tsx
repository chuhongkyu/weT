import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { connectDB } from 'utils/database';
import Nextauth from '../auth/[...nextauth]';


export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  
    let session:any = await getServerSession<any>(request, response, Nextauth)
    // console.log(session.user.email);

    if(session){
      if (request.method === 'POST') {
        const { comment, time, parent } = request.body;
        
        try {
          const client = await connectDB;
          const db = client.db('forum');
    
          const post = {
            comment: comment,
            time: time,
            email: session.user.email,
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
  }