import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from 'utils/database';
import bcrypt from 'bcrypt'


//이메일 실제 존재하는 건지 체크해야함.
//유저가 이메일이 존재하는지 체크해야함.
//비번 암호화 해야함.


export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    const hash = await bcrypt.hash(request.body.password, 17)
    request.body.password = hash
    const client = await connectDB;
    const db = client.db('forum');

    console.log(hash)
    console.log(request.body)

    const result = await db.collection('user_information').insertOne(request.body);
  
  }
}
