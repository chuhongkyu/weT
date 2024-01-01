import { signIn } from 'next-auth/react'

export default function SelectContainer(): JSX.Element {

  
  return (
    <div className="py-12 flex flex-col justify-center items-center">
      <div className="text-3xl">
          환영합니다!<br/>
      </div>
      <div className="py-6">
        {/* <Link className={styles.local} href={"/register/local"}><span>We T 회원가입</span></Link> */}
        <button className="google flex items-center text-base py-4 px-6 rounded-full border-gray-300 border-2" onClick={() => signIn('google')}>
          <span className="ml-5">구글 회원 가입</span>
        </button>
      </div>
    </div>
  );
}