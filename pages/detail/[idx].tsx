import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { connectDB } from "utils/database";
import { useSession } from 'next-auth/react'
import MainLayOut from "components/common/MainLayOut";
import { OpenBtn } from "components/recommend/OpenBtn";
import { IComment, IDetail, IParams } from "utils/typeGroup";
import CommentWrite from "components/detail/CommentWrite";
import CommentList from "components/detail/CommentList";
import CommentCount from "components/detail/CommentCount";

interface Props {
  detailData: IDetail;
  commentData: IComment[];
}

const Detail = ({ detailData, commentData }:Props) => {
  const { data: session } = useSession()
  const routes = useRouter()

  const onHandleWrite = (id: string) => {
    routes.push(`/edit/${id}`);
  };

  const onHandleDelete = (id:string) =>{
    let __confirmFlag = confirm("글을 삭제하시겠습니까?"); 
    if (__confirmFlag) {
      //예
      requestDelete(id)
    }else{
      //아니오
    }
  }

  const requestDelete = async (id:string) =>{
    if(session?.user?.email != detailData.email) return routes.push('/home');
    const formData = {_id: id,}
    try{
      const response = await fetch('/api/delete', {
        method: 'DELETE',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        routes.push('/');
      } else {
        routes.push('/detail');
      }
    }catch (error) {
      console.error(error);
    }
  }
    
  return (
    <MainLayOut>
      <section className="mx-8 max-w-5xl py-20 sm:mx-auto">
        <header className="mb-4 lg:mb-6 not-format">
            <div className="relative flex justify-between">
              <address className="flex items-center mb-6 not-italic">
                  <div className="inline-flex items-center mr-3 text-sm text-gray-900">
                      <img className="mr-4 w-16 h-16 rounded-full" src="/img/img_cat.jpg" alt={detailData?.email}/>
                      <div>
                          <p className="text-xl font-bold text-gray-900">{detailData?.email ? detailData?.email.substring(0, 10) + '...' : "익명"}</p>
                          <p className="text-base text-gray-500 dark:text-gray-400">{detailData?.category}</p>
                          <p className="text-base text-gray-500 dark:text-gray-400">{detailData?.title}</p>
                      </div>
                  </div>
              </address>
              {session?.user?.email == detailData?.email &&
              <OpenBtn id={detailData?._id + ""} onHandleDelete={onHandleDelete} onHandleWrite={onHandleWrite}/>
              }
            </div>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">{detailData?.title}</h1>
        </header>
        
        <section className="py-4 mb-4">
          <div className="blog-from text-base" dangerouslySetInnerHTML={{ __html: detailData?.content}}></div>
        </section>
          
        <section className="comment py-4">
          <CommentCount listData={commentData} />
          {session?.user?.email && <CommentWrite parentId={detailData?._id + ""} />}
          <CommentList listData={commentData}/>
        </section>
      </section>
    </MainLayOut>
  )
}

export async function getStaticPaths() {
    const client = await connectDB;
    const db = client.db('forum');
    const posts = await db.collection('post').find({}).toArray();
  
    const paths = posts.map((post) => ({
      params: { idx: post._id.toString() },
    }));
  
    return { paths, fallback: true };
}

export async function getStaticProps({ params }:IParams) {
    const client = await connectDB;
    const db = client.db('forum');
    const data = await db.collection('post').findOne({
        _id : new ObjectId(params.idx)
    });

    const comments = await db.collection('comment_collection').find({ parent: new ObjectId(params.idx)}).toArray();
  
    return { props: 
      { 
        detailData: JSON.parse(JSON.stringify(data)), 
        commentData: JSON.parse(JSON.stringify(comments))
      },
      revalidate: 60
    };
}

export default Detail;
