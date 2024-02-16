import MainLayOut from "components/MainLayOut";
import Banner from "components/Banner";
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
