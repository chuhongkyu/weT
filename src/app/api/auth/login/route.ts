import { connectDB } from '@/utils/database';
import bcrypt from 'bcrypt';

export default async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body

  if (!email || !password) {
    return Response.json({ message: '이메일과 비밀번호를 모두 입력해주세요.' });
  }
  const client = await connectDB;
  const db = client.db('forum');
  try {
    const user = await db.collection('user_information').findOne({ email });
    if (!user) {
      return Response.json({ message: '사용자를 찾을 수 없습니다.' });
    }
    //비밀번호 비교
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return Response.json({ message: '비밀번호가 올바르지 않습니다.' });
    }
    return Response.json(user);
  } catch (error) {
    return Response.json({ message: '서버 에러가 발생했습니다.' });
  }
}

