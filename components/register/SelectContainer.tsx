import { signIn } from 'next-auth/react'
import Link from 'next/link';

export default function SelectContainer(): JSX.Element {

  
  return (
    <div className="py-12 flex flex-col justify-center items-center">
       <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              환영합니다~
            </h1>
            <div className="w-full text-white bg-cyan-500 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-3 text-center">
              <Link href="/register/local" >
                Sign Up
              </Link> 
            </div>
            <button className="relative justify-center google w-full flex items-center border-gray-300 border-2 font-medium rounded-lg text-sm px-5 py-3" onClick={() => signIn('google')}>
                <span className="ml-5">구글 회원 가입</span>
            </button>
          </div>
        </div>
      
    </div>
  );
}