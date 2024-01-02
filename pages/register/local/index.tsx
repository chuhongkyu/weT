import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/router";
import MainLayOut from "components/MainLayOut";
import Link from "next/link";

interface RegisterFormValues {
  name: string;
  email_title: string;
  email_domain: string;
  password: string;
  confirmPassword: string;
}

interface RegisterErrorForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const clearFromState = {
  name: false,
  password: false,
  confirmPassword: false,
  email: false,
};

export default function Local(): JSX.Element {
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    name: "",
    email_title: "",
    email_domain: "",
    password: "",
    confirmPassword: "",
  });

  const routes = useRouter()
  const [formErrors, setFormErrors] = useState<Partial<RegisterErrorForm>>({});
  const [clear, setClear] = useState(clearFromState);
  const [allClear, setAllClear] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!allClear) {
      window.alert('폼을 완성해 주세요.')
      return
    }

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
          routes.push('/');
        } else {
          // 회원가입 실패 시 처리
        }
    })
    .catch((error) => {
      console.error(error);
    });
  };

  //너는 유효성 검사
  const handleBlur = () => {
    // const { name, value } = event.target;
    const errors: Partial<RegisterErrorForm> = {};

    if (!formValues.name) {
      errors.name = "이름을 확인 해주세요";
      setClear((prevState) => ({
        ...prevState,
        name: false,
      }))
    }else{
      errors.name = "";
      setClear((prevState) => ({
        ...prevState,
        name: true,
      }))
    }

    if (!formValues.password || !/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/.test(formValues.password)) {
      errors.password = "비밀번호는 특수문자가 포함된 8자리 이상이어야 합니다";
      setClear((prevState) => ({
        ...prevState,
        password: false,
      }))
    }else{
      errors.password = "";
      setClear((prevState) => ({
        ...prevState,
        password: true,
      }))
    }

    if (!formValues.confirmPassword || formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = "비밀번호를 확인해 주세요.";
      setClear((prevState) => ({
        ...prevState,
        confirmPassword: false,
      }))
    }else{
      errors.confirmPassword = "";
      setClear((prevState) => ({
        ...prevState,
        confirmPassword: true,
      }))
    }

    if (!formValues.email_title || !formValues.email_domain) {
      errors.email = "이메일을 확인해 주세요.";
      setClear((prevState) => ({
        ...prevState,
        email: false,
      }))
    }else if(formValues.email_title && formValues.email_domain ){
      errors.email = "";
      setClear((prevState) => ({
        ...prevState,
        email: true,
      }))
    }

    setFormErrors((prev) => ({ ...prev, ...errors }));
  };

  const handleDomain = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(()=>{
    if(Object.values(clear).every(value => value === true)){
      setAllClear(true)
    }else{
      setAllClear(false)
    }
  },[clear])

  return (
    <MainLayOut>
      <section className="mx-8 max-w-5xl sm:mx-auto py-20">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
              <img className="w-8 h-8 mr-2" src="/img/img_cat2.png" alt="logo"/>
              WeT
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                로그인
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  {/* 이메일 */}
                  <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="name">이름</label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                          id="name"
                          name="name"
                          type="text"
                          placeholder="이름"
                          maxLength={10}
                          onBlur={handleBlur}
                          value={formValues.name}
                          onChange={handleChange}
                        />
                        <span className="block mt-2 text-sm font-medium text-red-500">{formErrors.name ? formErrors.name : null}</span>
                  </div>

                  <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="password">비밀번호</label>
                        <input
                          id="password"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                          name="password"
                          type="password"
                          placeholder="비밀번호"
                          maxLength={16}
                          onBlur={handleBlur}
                          value={formValues.password}
                          onChange={handleChange}
                        />
                        
                        <span className="block mt-2 text-sm font-medium text-red-500">{formErrors.password ? formErrors.password : null}</span>
                  </div>
                  <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="confirmPassword">비밀번호 확인</label>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                          type="password"
                          placeholder="비밀번호"
                          maxLength={16}
                          onBlur={handleBlur}
                          value={formValues.confirmPassword}
                          onChange={handleChange}
                        />
                        
                        <span className="block mt-2 text-sm font-medium text-red-500">{formErrors.confirmPassword ? formErrors.confirmPassword : null}</span>
                  </div>

                  <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="email">이메일</label>
                        <div className="flex items-center">
                          <input 
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                              name="email_title"
                              id="email_title"
                              type="text"
                              value={formValues.email_title} 
                              placeholder="이메일" 
                              maxLength={18}
                              onBlur={handleBlur}
                              onChange={handleChange} /> @ 
                          <input 
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                              name="email_domain"
                              id="email_domain"
                              type="text" 
                              value={formValues.email_domain} 
                              placeholder="도메인" 
                              maxLength={15}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              /> 
                          <select
                              name="email_domain"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
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
                        </div>
                        {/* <span className={styles.check}></span> */}
                        <span className="block mt-2 text-sm font-medium text-red-500">{formErrors.email}</span>
                  </div>

                  <button
                    className={`w-full text-white bg-cyan-500 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-3 text-center ${
                      allClear ? '' : 'opacity-50 cursor-not-allowed'
                    }`}
                    type="submit"
                    disabled={!allClear}
                  >
                    회원가입
                  </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </MainLayOut>
  );
}