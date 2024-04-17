import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/database';
import bcrypt from 'bcrypt';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: '이메일과 비밀번호를 모두 입력해주세요.' });
    }

    const client = await connectDB;
    const db = client.db('forum');

    try {
      const user = await db.collection('user_information').findOne({ email });

      if (!user) {
        return response.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
      }

      //비밀번호 비교
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return response.status(401).json({ message: '비밀번호가 올바르지 않습니다.' });
      }

      response.status(200).json({ message: '로그인 성공!' });
    } catch (error) {
      response.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
