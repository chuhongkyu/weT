import MainLayOut from 'components/MainLayOut';
import { GetServerSideProps } from 'next';

const IndexPage = () => {
  return(
    <MainLayOut>
      
    </MainLayOut>
  )
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

export default IndexPage;
