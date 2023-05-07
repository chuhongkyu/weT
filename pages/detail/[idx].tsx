import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import React from "react";
import styles from "styles/Detail.module.scss";
import { connectDB } from "utils/database";

const Detail = ({ data }:any) => {
  const routes = useRouter()
  const onHandleWrite = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    routes.push(`/edit/${id}`);
  };

  const formattedContent = data.content.replace(/\n/g, "<br>");
    
  return (
    <div id={styles.Detail}>
        <div className={styles.warrper}>
          <div className={styles.header}>
            <h1>{data.title}</h1>
            <div className={styles.container_date}>
              <p className={styles.date}>{data.time}</p>
            </div>
          </div>
          
          <div className={styles.main_content}>
          <p className={styles.content} dangerouslySetInnerHTML={{ __html: formattedContent }}></p>
          </div>
          
          <div className={styles.bottom}>
            <button onClick={(e)=> onHandleWrite(data._id, e)} className={styles.edit_btn}>
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 72 72" width="64px" height="64px"><path d="M38.406 22.234l11.36 11.36L28.784 54.576l-12.876 4.307c-1.725.577-3.367-1.065-2.791-2.79l4.307-12.876L38.406 22.234zM41.234 19.406l5.234-5.234c1.562-1.562 4.095-1.562 5.657 0l5.703 5.703c1.562 1.562 1.562 4.095 0 5.657l-5.234 5.234L41.234 19.406z"/></svg>
            </button>
          </div>
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
