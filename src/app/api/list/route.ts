import { connectDB } from '@/utils/database';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')
    const category = searchParams.get('category')
    const page = searchParams.get('page') ? searchParams.get('page') : '1'
    const limit = searchParams.get('limit')? searchParams.get('limit') : '5'

    
    const client = await connectDB;
    const db = client.db('forum');
  
    let query = {};
    if (category) query = { ...query, category };
    const options = {
        skip: (parseInt(page) - 1) * parseInt(limit),
        limit: parseInt(limit),
    };

    let sort = {};
    if (type === 'latest') {
        sort = { time: -1 };
    } else if (type === 'old') {
        sort = { time: 1 };
    }

    const posts = await db.collection('post')
        .find(query)
        .sort(sort)
        .skip(options.skip)
        .limit(options.limit)
        .toArray();
    // 각 게시글에 대한 댓글 수를 집계합니다.
    const postsWithCommentsCount = await Promise.all(posts.map(async (post) => {
        const commentsCount = await db.collection('comment_collection')
            .countDocuments({ parent: post._id });
        return { ...post, commentsCount };
    }));
    const totalCount = await db.collection('post').countDocuments(query);

    return Response.json({ lists: postsWithCommentsCount, totalCount })
}
