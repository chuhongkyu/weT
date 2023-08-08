import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loading from 'components/Loading';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/contents');
  }, []);

  return <Loading/>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  // 서버에서 데이터를 가져오는 코드
  return { props: {} };
};

export default IndexPage;
