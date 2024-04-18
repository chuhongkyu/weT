import { ObjectId } from 'mongodb';
import { connectDB } from '@/utils/database';

export async function GET(request: Request) {
    let parentId:string = "";
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
   if(id){
       parentId = Array.isArray(id) ? id[0] : id;
   } else {
       return Response.json({ message: 'ID가 필요합니다.' });
   }

   const client = await connectDB;
   const db = client.db('forum');
   try {
       const result = await db.collection('comment_collection')
       .find({ parent: new ObjectId(parentId)})
       .toArray();

        return Response.json(result)
   }catch (error) {
        return Response.json({ message: '서버 에러가 발생했습니다.' })
    }
}   
