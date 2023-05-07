import { NextPage } from "next";
import Link from "next/link";
import { connectDB } from "utils/database";
import styles from "styles/Home.module.scss";
import Nav from "components/Nav";

const Home: NextPage<{ data: any[] }> = ({ data }) => {
  console.log(data);

  return (
    <div id={styles.Home}>
        <div className={styles.warrper}>
          <Nav/>
          <h1>HOME</h1>
          <div className={styles.write_btn}>
            <Link href={'/write'}>+</Link>
          </div>
          <ul>
            {data ? data.map((item) => (
              <li key={item._id}>
                <Link href={`/detail/${item._id}`}>
                  <h5 className={styles.title}>{item.title}</h5>
                  <p className={styles.content}>{item.content}</p>
                  <div className={styles.container_bottom}>
                    <p className={styles.date}>{item.time}</p>
                  </div>
                </Link>
              </li>
            )): null}
          </ul>
        </div>
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