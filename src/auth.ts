import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "./utils/database";
import bcrypt from 'bcrypt'

const SCRET = process.env.NEXTAUTH_SECRET || ''

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: '/login',
    newUser: '/sinup',
  },
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
      async authorize(credentials:any) {
        const client = await connectDB;
        const db = client.db('forum');
        const user = credentials ? await db.collection('user_information').findOne({ email: credentials.email }) : null;
        if (!user) {
          throw new Error('해당 이메일은 없음');
        }
        const pwcheck = credentials ? await bcrypt.compare(credentials.password, user.password) : null;
        if (!pwcheck) {
          throw new Error('비번틀림');
        }
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      }
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 //30일
  },
  callbacks: {
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
  secret : SCRET
});