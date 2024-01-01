import { signIn, useSession } from 'next-auth/react'

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
    <div className="py-12 flex flex-col justify-center items-center">
      <div className="text-3xl">
          어서오세요~<br/>
          로그인 해주세요.
      </div>
      <div className="py-6">
        {/* <Link className={styles.local} href={"/register/local"}><span>We T 회원가입</span></Link> */}
        <button className="google flex items-center text-base py-4 px-6 rounded-full border-gray-300 border-2" onClick={() => signIn('google')}>
          <span className="ml-5">구글 이메일 로그인</span>
        </button>
      </div>
    </div>
  )
}