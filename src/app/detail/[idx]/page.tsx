
import { IComment, IDetail, IParams } from "@/utils/typeGroup";
import OtherPost from "@/app/_components/detail/OtherPost";
import Loading from "@/app/_components/common/Loading";
import CommentContainer from "@/app/_components/detail/CommentContainer";
import { getCommentList, getDetailList } from "@/utils/api";
import { auth } from "@/auth";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import DetailContent from "@/app/_components/detail/DetailContent";

interface IProps {
  detailData: IDetail;
  previousPostData: IDetail;
  nextPostData: IDetail;
}

type Props = {
  params: { idx: string },
}


export default async function Detail ({ params  }:any){
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['detail', params.idx], queryFn: getDetailList})
  await queryClient.prefetchQuery({queryKey: ['comment', params.idx], queryFn: getCommentList})
  const dehydratedState = dehydrate(queryClient);

  // const { data: session } = useSession()
  // const routes = useRouter()

  // const onHandleWrite = (id: string) => {
  //   routes.push(`/edit/${id}`);
  // };

  // const onHandleDelete = (id:string) =>{
  //   let __confirmFlag = confirm("글을 삭제하시겠습니까?"); 
  //   if (__confirmFlag) {
  //     //예
  //     requestDelete(id)
  //   }else{
  //     //아니오
  //   }
  // }

  // const requestDelete = async (id:string) =>{
  //   if(session?.user?.email != detailData.email) return routes.push('/home');
  //   const formData = {_id: id,}
  //   try{
  //     const response = await fetch('/api/delete', {
  //       method: 'DELETE',
  //       body: JSON.stringify(formData),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     if (response.ok) {
  //       routes.push('/');
  //     } else {
  //       routes.push('/detail');
  //     }
  //   }catch (error) {
  //     console.error(error);
  //   }
  // }
    
  return (
      <section className="mx-8 max-w-5xl py-20 sm:mx-auto">
        <HydrationBoundary state={dehydratedState}>
          <DetailContent idx={params.idx}/>
        </HydrationBoundary>
        
        
    
      </section>
  )
}
