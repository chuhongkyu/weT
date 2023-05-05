import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  console.log(123);
  return response.status(200).json('요청 성공');
}
