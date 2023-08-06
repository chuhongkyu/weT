import styles from "styles/Register.module.scss";
import { useState, FormEvent } from "react";
import Footer from "components/Footer";
import Nav from "components/Nav";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

interface RegisterFormValues {
  name: string;
  email_title: string;
  email_domain: string;
  password: string;
  confirmPassword: string;
}

export default function Local(): JSX.Element {
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    name: "",
    email_title: "",
    email_domain: "",
    password: "",
    confirmPassword: "",
  });

  const routes = useRouter()

  const [checkN, setCheckN] = useState({
    name: false,
    password: false,
    confirmPassword: false,
    email: false,
  })

  const [formErrors, setFormErrors] = useState<Partial<RegisterFormValues>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    errorMessage();
    const { name, email_title, email_domain, password } = formValues;
    fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email: `${email_title}@${email_domain}`, password }),
    })
      .then((response) => {
        if (response.ok) {
          // 회원가입 성공 시 처리
          console.log("성공")
          routes.push('/home');
        } else {
          // 회원가입 실패 시 처리
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const errorMessage = () => {
    const errors: Partial<RegisterFormValues> = {};

    if (!formValues.name) {
      errors.name = "이름을 입력해주세요";
    }

    if (!formValues.email_title || !formValues.email_domain) {
      errors.email_title = "이메일을 입력해주세요";
      errors.email_domain = "이메일 도메인을 입력해주세요";
    }

    if (!formValues.password) {
      errors.password = "비밀번호를 입력해주세요";
    }

    if (!formValues.confirmPassword) {
      errors.confirmPassword = "비밀번호 확인을 입력해주세요";
    } else if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = "비밀번호가 일치하지 않습니다";
    }

    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      setFormErrors(errors);
      return;
    }
  }

  const handleDomain = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const errors: Partial<RegisterFormValues> = {};

    if (name === "name") {
      if (!value) {
        errors.name = "이름을 입력해주세요";
        setCheckN((prevState) => ({
          ...prevState,
          name: false,
        }))
      }else if(value){
        setCheckN((prevState) => ({
          ...prevState,
          name: true,
        }))
      }else{
        setCheckN((prevState) => ({
          ...prevState,
          name: false,
        }))
      }
    }

    if (name === "password") {
      if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/.test(value)) {
        errors.password = "비밀번호는 특수문자가 포함된 8자리 이상이어야 합니다";
        setCheckN((prevState) => ({
          ...prevState,
          password: false,
        }))
      }else if(/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/.test(value)){
        errors.password = "";
        setCheckN((prevState) => ({
          ...prevState,
          password: true,
        }))
      }else{
        setCheckN((prevState) => ({
          ...prevState,
          password: false,
        }))
      }
    }

    if (name === "confirmPassword") {
      if (!value) {
        errors.confirmPassword = "비밀번호 확인을 입력해주세요";
        setCheckN((prevState) => ({
          ...prevState,
          confirmPassword: false,
        }))
      }
      else if(formValues.password !== value){
        errors.confirmPassword = "비밀번호가 일치하지 않습니다";
        setCheckN((prevState) => ({
          ...prevState,
          confirmPassword: false,
        }))
      }
      else if(formValues.password == value) {
        errors.confirmPassword = "";
        setCheckN((prevState) => ({
          ...prevState,
          confirmPassword: true,
        }))
      }
    }
 
    setFormErrors((prev) => ({ ...prev, ...errors }));
  };

  return (
    <div id={styles.Register}>
      <Nav/>
        <div className={styles.wrapper}>
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
                        onBlur={handleBlur}
                        value={formValues.name}
                        onChange={handleChange}
                        />
                        <motion.span 
                          initial={{background: "#fff"}}
                          animate={checkN.name ? {background: "#68d868"}: {}}
                         className={styles.check}></motion.span>
                        <span className={styles.error}>{formErrors.name ? formErrors.name : null}</span>
                    </div>
                    <div className={styles.input_password}>
                        <label htmlFor="password">비밀번호</label>
                        <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="비밀번호"
                        maxLength={16}
                        onBlur={handleBlur}
                        value={formValues.password}
                        onChange={handleChange}
                        />
                        <motion.span 
                          initial={{background: "#fff"}}
                          animate={checkN.password ? {background: "#68d868"}: {}}
                         className={styles.check}></motion.span>
                        <span className={styles.error}>{formErrors.password ? formErrors.password : null}</span>
                    </div>
                    <div className={styles.input_password}>
                        <label htmlFor="confirmPassword">비밀번호 확인</label>
                        <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="비밀번호"
                        maxLength={16}
                        onBlur={handleBlur}
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                        />
                        <motion.span 
                          initial={{background: "#fff"}}
                          animate={checkN.confirmPassword ? {background: "#68d868"}: {}}
                         className={styles.check}></motion.span>
                        <span className={styles.error}>{formErrors.confirmPassword ? formErrors.confirmPassword : null}</span>
                    </div>
                    <div className={styles.input_email}>
                        <label htmlFor="email">이메일</label>
                        <input 
                            name="email_title"
                            id="email_title"
                            type="text"
                            value={formValues.email_title} 
                            placeholder="이메일" 
                            maxLength={18}
                            onChange={handleChange} /> @ 
                        <input 
                            name="email_domain"
                            id="email_domain"
                            type="text" 
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
                        {/* <span className={styles.check}></span> */}
                        <span className={styles.error}>{formErrors.email_domain ? formErrors.email_domain : null}</span>
                    </div>
                    
                    <div className={styles.button_container}>
                        <button type="submit">회원가입</button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      <Footer/>
    </div>
  );
}