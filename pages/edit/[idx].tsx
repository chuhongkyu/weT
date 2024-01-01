import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "styles/Write.module.scss";
import { connectDB } from "utils/database";
import Footer from "components/Footer"
import { useSession } from "next-auth/react";
import Nav from "components/Nav";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import MainLayOut from "components/MainLayOut";

const ReactQuill = dynamic( () => import('react-quill'), {
  ssr : false
})

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
    
    const handleContentChange = (event: any) => {
      setContent(event);
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
      // user 확인
      if(!session?.user?.email == data.email) return 
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

    if (status === "loading") {
      return <div className={styles.container}>Loading...</div>
    }

    

    return (
      <>
        {session?.user ? 
        (
          <MainLayOut>
            <section className="mx-8 max-w-5xl py-20 sm:mx-auto">
                <h1 className="text-3xl py-6">글 수정</h1>
                <form onSubmit={handleSubmit} action="/api/edit" method="POST">
                    <label htmlFor="title" className="text-2xl">
                    제목:
                    </label>
                    <div className="my-4 bg-gray-200 rounded-md">
                        <input
                            id="title"
                            className="p-4 w-full text-base"
                            type="text"
                            name="title"
                            maxLength={25}
                            defaultValue={data.title}
                            placeholder={"제목을 입력해 주세요."}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <label htmlFor="category" className="text-2xl">
                      카테고리:
                    </label>
                    <div className="my-4 bg-gray-200 rounded-md w-40 text-base">
                        <select id="category" className="p-4 w-full" name="category" defaultValue={data.category} onChange={handleCategoryChange}>
                            {/* <option value="" >카테고리 선택</option> */}
                            <option value="default">전체</option>
                            <option value="netflix">NETFLIX</option>
                            <option value="disney plus">DISNEY PLUS</option>
                            <option value="watcha">WATCHA</option>
                            <option value="tving">TVING</option>
                            <option value="wave">WAVE</option>
                        </select>
                    </div>
                    <label className="text-2xl">
                        내용 :
                    </label>
                    <div className="my-4 bg-gray-200">
                        <ReactQuill 
                          style={{ height: "500px"}}
                          onChange={handleContentChange}
                          defaultValue={data.content}
                          />
                    </div>
                    <button
                      type="submit" 
                      className={`rounded-lg text-base px-4 py-4 text-center w-full ${check ? "cursor-not-allowed text-gray-200 bg-cyan-700" : "cursor-pointer text-white bg-cyan-500"}`} data-disabled={check}
                      >제출하기
                    </button> 
                </form>
            </section>
          </MainLayOut>): router.push('/')}
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
