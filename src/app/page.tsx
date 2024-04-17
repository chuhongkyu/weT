import RQProvider from "@/app/_components/common/RQProvider";
import MainSection from "@/app/_components/home/MainSection";
import Banner from "@/app/_components/home/Banner";
  
const IndexPage = () => {
  return(
    <>
      <Banner/>
      <RQProvider>
        <MainSection/>
      </RQProvider>
    </>
  )
};

export default IndexPage;
