import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import styles from "styles/Detail.module.scss";
import { connectDB } from "utils/database";

const Detail = ({ data }:any) => {
    
    return (
      <div id={styles.Detail}>
          <div className={styles.warrper}>
            <h1>{data.title}</h1>
            <div className={styles.container_date}>
              <p className={styles.date}>{data.time}</p>
            </div>
            <p className={styles.content}>{data.content}</p>
          </div>
      </div>
    )
}

export async function getStaticPaths() {
    const client = await connectDB;
    const db = client.db('forum');
    const posts = await db.collection('post').find({}).toArray();
  
    const paths = posts.map((post) => ({
      params: { idx: post._id.toString() },
    }));
  
    return { paths, fallback: false };
}

export async function getStaticProps({ params }:any) {
    const client = await connectDB;
    const db = client.db('forum');
    const data = await db.collection('post').findOne({
        _id : new ObjectId(params.idx)
    });
  
    return { props: { data: JSON.parse(JSON.stringify(data)) } };
}

export default Detail;
