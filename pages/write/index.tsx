import { useEffect, useState } from 'react';
import styles from 'styles/Write.module.scss';

type WriteProps = {
  onSubmit: (title: string, content: string) => void;
};

const Write = ({ onSubmit }: WriteProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [popup, setPopup] = useState(false);
  const [check, setCheck] = useState(false)

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(title, content);
    setTitle('');
    setContent('');
  };

  const handlePopup = (event: React.MouseEvent<HTMLDivElement>) =>{
    setPopup(!popup)
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
                <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="title" className={styles.label}>
                    제목:
                </label>
                <div className={styles.input_title}>
                    <input
                        type="text"
                        id="title"
                        placeholder={"제목을 입력해 주세요."}
                        className={styles.input_title}
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>

                <label htmlFor="content" className={styles.label}>
                    내용 :
                </label>
                <div className={styles.textarea_content}>
                    <textarea
                        id="content"
                        className={styles.textarea}
                        value={content}
                        rows={5}
                        onChange={handleContentChange}
                        placeholder={"내용을 입력해 주세요."}
                    />
                    <p className={styles.count_number}>
                        <span className={styles.current}>{remainingChars}</span>/<span> 500</span>
                    </p>
                </div>
                <div className={styles.buttons}>
                    <span 
                        className={styles.button}
                        data-disabled={check}
                        onClick={handlePopup}
                    >
                        제출하기
                    </span>
                </div>
                
            </form>
            </div>
        </div>
        {popup ? 
            <div className={styles.dim}>
                <div className={styles.popup}>
                    <h5>계시 하시겠습니까?</h5>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.button}>
                            확인
                        </button>
                        <div className={styles.button} onClick={handlePopup}>
                            아니오
                        </div>
                        {/* <button type="button" className={styles.button}>
                            수정하기
                        </button> */}
                    </div>
                </div>
            </div> : null
        }
    </>
  );
};

export default Write;
