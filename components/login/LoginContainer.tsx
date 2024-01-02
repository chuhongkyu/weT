import { useSession } from 'next-auth/react'
import Link from 'next/link'
import LoginForm from './LoginForm'

export default function LoginContainer() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="text-2xl flex justify-center text-center py-6">Loading...</div>
  }

  if (session?.user) {
    return (
        <div className="text-2xl flex justify-center items-center text-center py-6 h-44">
          구글 메일 <p className="font-bold px-4 underline">{session.user.email}</p> 로 로그인 하였습니다.
        </div>
      )
  }

  
  return (
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
              <img className="w-8 h-8 mr-2" src="/img/img_cat2.png" alt="logo"/>
              WeT
          </Link>
          <LoginForm/>
      </div>
  )
}