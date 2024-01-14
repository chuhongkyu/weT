import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from 'utils/database';
import bcrypt from 'bcrypt'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    const hash = await bcrypt.hash(request.body.password, 17)
    request.body.password = hash
    const client = await connectDB;
    const db = client.db('forum');

    // console.log(hash)
    // console.log(request.body)
    try {
      const result = await db.collection('user_information').insertOne(request.body);
      response.status(200).json(result);
    }catch (error) {
        response.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
