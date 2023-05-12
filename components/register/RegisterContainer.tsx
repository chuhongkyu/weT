import styles from "styles/Register.module.scss";
import { useState, FormEvent } from "react";
interface RegisterFormValues {
  user_id: string;
  name: string;
  email_title: string;
  email_domain: string;
  password: string;
}

export default function RegisterContainer(): JSX.Element {
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    user_id: "",
    name: "",
    email_title: "",
    email_domain: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {user_id, name, email_title, email_domain, password,  } = formValues;
    fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user_id, name, email: `${email_title}@${email_domain}`, password }),
    })
      .then((response) => {
        if (response.ok) {
          // 회원가입 성공 시 처리
          console.log("성공")
        } else {
          // 회원가입 실패 시 처리
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDomain = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.input_name}>
            <label htmlFor="name">이름</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="이름"
              maxLength={10}
              value={formValues.name}
              onChange={handleChange}
            />
            <span className={styles.check}></span>
          </div>
          <div className={styles.input_id}>
            <label htmlFor="user_id">아이디</label>
            <input
              id="user_id"
              name="user_id"
              type="text"
              placeholder="아이디"
              maxLength={10}
              value={formValues.user_id}
              onChange={handleChange}
            />
            <span className={styles.check}></span>
          </div>
          <div className={styles.input_password}>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호"
              maxLength={16}
              value={formValues.password}
              onChange={handleChange}
            />
            <span className={styles.check}></span>
          </div>
          <div className={styles.input_email}>
            <label htmlFor="email">이메일</label>
            <input 
                name="email_title"
                id="email_title"
                type="email" 
                value={formValues.email_title} 
                placeholder="이메일" 
                maxLength={18}
                onChange={handleChange} /> @ 
            <input 
                name="email_domain"
                id="email_domain"
                type="email" 
                value={formValues.email_domain} 
                placeholder="도메인" 
                maxLength={15}
                onChange={handleChange}
                /> 
            <select
                name="email_domain"
                className="email_select"
                onChange={handleDomain}
              >
                <option value="">직접선택</option>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="hotmail.com">hotmail.com</option>
                <option value="korea.com">korea.com</option>
                <option value="nate.com">nate.com</option>
                <option value="yahoo.com">yahoo.com</option>
            </select>
            <span className={styles.check}></span>
          </div>
          
          <div className={styles.button_container}>
            <button type="submit">회원가입</button>
          </div>
        </form>
      </div>
    </div>
  );
}