import MainLayOut from "components/common/MainLayOut";
import Banner from "components/home/Banner";
import { Suspense } from "react";
import MainSection from "components/home/MainSection";
import RQProvider from "components/common/RQProvider";

const IndexPage = () => {
  return(
    <MainLayOut>
      <Banner/>
      <Suspense fallback={null}>
        <RQProvider>
          <MainSection/>
        </RQProvider>
      </Suspense>
    </MainLayOut>
  )
};

export default IndexPage;
