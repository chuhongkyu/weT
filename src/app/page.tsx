import MainSection from "@/app/_components/home/MainSection";
import Banner from "@/app/_components/home/Banner";
import { auth } from "@/auth";
  
export default async function IndexPage(){
  const session = auth()
  // console.log(session)
  return(
    <>
      <Banner/>
      <MainSection/>
    </>
  )
};
