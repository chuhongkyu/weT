import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "styles/Write.module.scss";
import { connectDB } from "utils/database";

const Edit = ({ data }:any) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [check, setCheck] = useState(false)
    const router = useRouter()
    
    const makeTime = () => {
      const time = new Date();
      const year = time.getFullYear();
      const month = time.getMonth() + 1;
      const date = time.getDate();
      const newDate = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`
      return newDate
    }
    
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    };
    
    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(event.target.value);
    };
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    
      const newTime = makeTime();
    
      const formData = {
        title: title,
        content: content,
        time: newTime
      }
    
      try {
        const response = await fetch('/api/new', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (response.ok) {
          // 성공적으로 게시글이 작성된 경우, 홈 화면으로 이동합니다.
          router.push('/home');
        } else {
          // 에러가 발생한 경우, 상세 화면으로 이동합니다.
          router.push('/detail');
        }
      } catch (error) {
        console.error(error);
      }
    }
    
    
    useEffect(() => {
      if(title !== ''){
          setCheck(false)
      }else{
          setCheck(true)
      }
    }, [title])
    
    const remainingChars = 0 + content.length;
    
    return (
      <>
          <div id={styles.Write}>
              <div className={styles.warrper}>
                  <h1 className={styles.title}>글 작성</h1>
                  <form onSubmit={handleSubmit} action="/api/new" method="POST" className={styles.form}>
                      <label htmlFor="title" className={styles.label}>
                          제목:
                      </label>
                      <div className={styles.input_title}>
                          <input
                              type="text"
                              name="title"
                              defaultValue={data.title}
                              placeholder={"제목을 입력해 주세요."}
                              className={styles.input_title}
                              onChange={handleTitleChange}
                          />
                      </div>
    
                      <label htmlFor="content" className={styles.label}>
                          내용 :
                      </label>
                      <div className={styles.textarea_content}>
                          <textarea
                              id="content"
                              name="content"
                              className={styles.textarea}
                              defaultValue={data.content}
                              rows={5}
                              onChange={handleContentChange}
                              placeholder={"내용을 입력해 주세요."}
                          />
                          <p className={styles.count_number}>
                              <span className={styles.current}>{remainingChars}</span>/<span> 500</span>
                          </p>
                      </div>
                      <div className={styles.buttons}>
                          <button 
                              type="submit"
                              className={styles.button}
                              data-disabled={check}
                          >
                              제출하기
                          </button>
                      </div>   
                  </form>
              </div>
          </div>
          
      </>
    );
};

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

export default  Edit;
