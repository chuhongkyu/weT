'use client'

import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link';
import Loading from 'src/app/_components/common/Loading';

interface LoginFormValues {
    email: string;
    password: string;
  }
  
  interface RegisterErrorForm {
    email: string;
    password: string;
  }
  
  const clearFromState = {
    email: false,
    password: false,
  };

const LoginForm = () => {
    const [formValues, setFormValues] = useState<LoginFormValues>({
        email: "",
        password: "",
    });
    
    const [clear, setClear] = useState(clearFromState);
    const [isLoading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { email, password } = formValues;
        setLoading(true)

        const result = await signIn('credentials', {
            email, password, redirect: false
        });

        if (result?.error) {
            setLoading(false)
            alert(result.error)
        }
    }

    const handleBlur = () => {
        const errors: Partial<RegisterErrorForm> = {};

        if (!formValues.email) {
            errors.email = "이름을 확인 해주세요";
            setClear((prevState) => ({
                ...prevState,
                email: false,
            }))
        }else{
            errors.email = "";
            setClear((prevState) => ({
                ...prevState,
                email: true,
            }))
        }

        if (!formValues.password) {
            errors.password = "비밀번호를 확인해 주세요.";
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
    }

    return(
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                로그인
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input onBlur={handleBlur} onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="name@company.com"/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input onBlur={handleBlur} onKeyDown={handleBlur} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"/>
                    </div>
                    <button 
                        type="submit" 
                        className={`w-full text-white bg-cyan-500 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-3 text-center 
                      ${clear.password && clear.email ? '' : 'opacity-50 cursor-not-allowed'}`}>Sign in</button>
                </form>
                <button className="relative justify-center google w-full flex items-center border-gray-300 border-2 font-medium rounded-lg text-sm px-5 py-3" onClick={() => signIn('google')}>
                    <span className="ml-5">구글 이메일 로그인</span>
                </button>
                <p className="text-sm font-light text-gray-500">
                    회원가입 <Link href="/register" className="font-medium text-cyan-600 hover:underline">Sign up</Link>
                </p>
                {isLoading && <div className="w-full h-full top-0 z-10 left-0 bg-white opacity-60 flex flex-col justify-center items-center absolute">
                    <Loading/>
                </div>}
            </div>
        </div>
    )
}

export default LoginForm;