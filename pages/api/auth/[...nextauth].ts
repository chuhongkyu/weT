import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
  ],
  secret : 'N$%R12G5'
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)