import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const newDate = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`
  return response.status(200).json(newDate);
}
