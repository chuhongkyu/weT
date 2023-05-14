import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { User } from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from 'utils/database';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config();

const SCRET = process.env.NEXTAUTH_SECRET || ''

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드 
      name: "credentials",
        credentials: {
          email: { label: "email", type: "text" },
          password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고 
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<User | null> {
        const client = await connectDB;
        const db = client.db('forum');
        const user = credentials ? await db.collection('user_cred').findOne({ email: credentials.email }) : null;
        if (!user) {
          console.log('해당 이메일은 없음');
          return null;
        }
        const pwcheck = credentials ? await bcrypt.compare(credentials.password, user.password) : null;
        if (!pwcheck) {
          console.log('비번틀림');
          return null;
        }
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      }
    })
  ],

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60 //30일
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드 
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }:any) => {
      if (user) {
        token.user = {};
        token.user.name = user.name
        token.user.email = user.email
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }:any) => {
      session.user = token.user;  
      return session;
    },
  },

  // adapter: MongoDBAdapter(connectDB),
  secret : SCRET
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)