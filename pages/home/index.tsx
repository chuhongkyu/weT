import { NextPage } from "next";
import { connectDB } from "utils/database";

const Home: NextPage<{ data: any[] }> = ({ data }) => {
  console.log(data);
  return (
    <div>
        <h1>HOME</h1>
        <ul>
        {data ? data.map((item) => (
          <li key={item._id}>{item.content}</li>
        )): null}
      </ul>
    </div>
  )
}

export const getStaticProps = async () => {
  let client = await connectDB;
  const db = client.db('forum');
  let data = await db.collection('post').find().toArray();
  console.log(data)
  return { props: { data: JSON.parse(JSON.stringify(data)) } };
};

export default Home;