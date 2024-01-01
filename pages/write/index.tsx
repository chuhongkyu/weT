import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import MainLayOut from 'components/MainLayOut';

const ReactQuill = dynamic( () => import('react-quill'), {
  ssr : false
})

const Write = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [check, setCheck] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

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

  const handleContentChange = (event: any) => {
    console.log(content)
    setContent(event);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTime = makeTime();
  
    const formData = {
      title: title,
      content: content,
      category: category,
      time: newTime,
      email: session?.user ? session?.user.email : "익명"
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
        router.push('/');
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

  useEffect(() => {
    if (!session?.user) {
      router.push('/login');
    }
  }, []);

  const preventGoBack = () => {
    history.pushState(null, "", location.href);
    const confirmExit = confirm('변경 사항을 저장하지 않고 떠나시겠습니까?');
      
    if (confirmExit) {
      window.location.replace(document.referrer); 
      // history.back();
      // 작동안함
    } else {
    }
  };
   
  useEffect(() => {
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);
    
    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  // const remainingChars = 0 + content.length;

  return (
      <MainLayOut>
        <section className="mx-8 max-w-5xl py-20 sm:mx-auto">
          <h1 className="text-3xl py-6">글 작성</h1>
          <form onSubmit={handleSubmit} action="/api/new" method="POST">
              <label htmlFor="title" className="text-2xl">
                  제목:
              </label>
              <div className="my-4 bg-gray-200 rounded-md">
                  <input
                      id="title"
                      className="p-4 w-full text-base"
                      type="text"
                      name="title"
                      placeholder={"제목을 입력해 주세요."}
                      value={title}
                      maxLength={25}
                      onChange={handleTitleChange}
                  />
              </div>
              <label htmlFor="category" className="text-2xl">
                  카테고리:
              </label>
              <div className="my-4 bg-gray-200 rounded-md w-40 text-base">
                  <select id="category" className="p-4 w-full" name="category" value={category} onChange={handleCategoryChange}>
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
                    onChange={handleContentChange}/>
              </div>
              <button
                type="submit" 
                className={`rounded-lg text-base px-4 py-4 text-center w-full ${check ? "cursor-not-allowed text-gray-200 bg-cyan-700" : "cursor-pointer text-white bg-cyan-500"}`} data-disabled={check}
                >제출하기
              </button>
          </form>
        </section>              
      </MainLayOut>
    );
};

export default Write;
