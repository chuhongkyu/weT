import MainLayOut from "components/common/MainLayOut";
import Banner from "components/home/Banner";
import { Suspense } from "react";
import MainSection from "components/home/MainSection";

const IndexPage = () => {
  return(
    <MainLayOut>
      <Banner/>
      <Suspense fallback={null}>
        <MainSection/>
      </Suspense>
    </MainLayOut>
  )
};

export default IndexPage;
