import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import styles from "styles/Login.module.scss";

export default function LoginContainer() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className={styles.container}>Loading...</div>
  }

  if (session?.user) {
    return <div className={styles.container}>Signed in as {session.user.email}</div>
  }

  return (
    <div className={styles.container}>
        <div className={styles.text}>
            반가워요!<br/>
          로그인 해주세요.
      </div>
      <div className={styles.selects}>
        {/* <Link className={styles.local} href={"/register/local"}><span>We T 회원가입</span></Link> */}
        <button className={styles.google} onClick={() => signIn('google')}><span>구글 회원 로그인</span></button>
      </div>
    </div>
  )
}