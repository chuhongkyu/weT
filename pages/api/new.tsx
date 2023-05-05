import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from 'utils/database';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    const { title, content, time } = request.body;

    if (title === '') {
      return response.status(500).redirect('/detail');
    }

    try {
      const client = await connectDB;
      const db = client.db('forum');

      const post = {
        title: title,
        content: content,
        time: time
      };

      const result = await db.collection('post').insertOne(post);

      response.status(200).json({ message: '게시글 작성 성공!' });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
