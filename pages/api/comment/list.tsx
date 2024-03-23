import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from 'utils/database';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'GET') {
        let parentId:string = "";
        
        if(request.query.id){
            parentId = Array.isArray(request.query.id) ? request.query.id[0] : request.query.id;
        } else {
            return response.status(400).json({ message: 'ID가 필요합니다.' });
        }

        const client = await connectDB;
        const db = client.db('forum');
        try {
            const result = await db.collection('comment_collection')
            .find({ parent: new ObjectId(parentId)})
            .toArray();

            response.status(200).json(result);
        }catch (error) {
            response.status(500).json({ message: '서버 에러가 발생했습니다.' });
        }
    }   
}