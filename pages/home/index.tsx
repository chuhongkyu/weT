import { NextPage } from "next";
import Link from "next/link";
import { connectDB } from "utils/database";
import styles from "styles/Home.module.scss";
import Nav from "components/Nav";
import { useRouter } from "next/router";

const Home: NextPage<{ data: any[] }> = ({ data }) => {
  console.log(data);
  const routes = useRouter()
  const onHandleWrite = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    routes.push(`/edit/${id}`);
  };

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
                    <button onClick={(e)=> onHandleWrite(item._id, e)} className={styles.edit_btn}>
                      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 72 72" width="64px" height="64px"><path d="M38.406 22.234l11.36 11.36L28.784 54.576l-12.876 4.307c-1.725.577-3.367-1.065-2.791-2.79l4.307-12.876L38.406 22.234zM41.234 19.406l5.234-5.234c1.562-1.562 4.095-1.562 5.657 0l5.703 5.703c1.562 1.562 1.562 4.095 0 5.657l-5.234 5.234L41.234 19.406z"/></svg>
                    </button>
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