import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "styles/Write.module.scss";
import { connectDB } from "utils/database";
import Footer from "components/Footer"
import { useSession } from "next-auth/react";

const Edit = ({ data }:any) => {
    const [title, setTitle] = useState(data.title);
    const [content, setContent] = useState(data.content);
    const [category, setCategory] = useState(data.category);
    const [check, setCheck] = useState(true)
    const [current, setCurrent] = useState(content.length);
    const router = useRouter()
    const { data: session, status } = useSession();
    
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
      setCheck(false)
    };
    
    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(event.target.value);
      setCheck(false)
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(event.target.value);
      setCheck(false)
    };
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    
      const newTime = makeTime();
    
      const formData = {
        _id: router.query.idx,
        title: title,
        category: category,
        content: content,
        time: newTime,
        email: session?.user ? session?.user.email : "익명"
      }
    
      try {
        const response = await fetch('/api/edit', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (response.ok) {
          // 성공적으로 게시글이 작성된 경우, 홈 화면으로 이동합니다.
          router.push(`/detail/${router.query.idx}`);
        } else {
          // 에러가 발생한 경우, 상세 화면으로 이동합니다.
          router.push('/detail');
        }
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(()=>{
      setCurrent(0 + content.length);
    }, [content])
    
    return (
        <div id={styles.Write}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>글 작성</h1>
                <form onSubmit={handleSubmit} action="/api/edit" method="POST" className={styles.form}>
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
                    <label htmlFor="category" className={styles.label}>
                      카테고리:
                    </label>
                    <div className={styles.select_category}>
                        <select id="category" name="category" defaultValue={data.category} onChange={handleCategoryChange}>
                            {/* <option value="" >카테고리 선택</option> */}
                            <option value="default">전체</option>
                            <option value="netflix">NETFLIX</option>
                            <option value="tving">TVING</option>
                            <option value="wave">WAVE</option>
                            <option value="disney plus">DISNEY PLUS</option>
                        </select>
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
                            <span className={styles.current}>{current}</span>/<span> 500</span>
                        </p>
                    </div>
                    <div className={styles.buttons}>
                        <button 
                            type="submit"
                            className={styles.button}
                            data-disabled={check}
                        >
                            수정하기
                        </button>
                    </div>   
                </form>
            </div>
            <Footer/>
        </div>
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
