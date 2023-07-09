import Link from "next/link";
import styles from "styles/Register.module.scss";
import { signIn } from 'next-auth/react'

export default function SelectContainer(): JSX.Element {

  
  return (
    <div className={styles.container}>
      <div className={styles.text}>
            반가워요!<br/>
          계정을 선택해주세요.
      </div>
      <div className={styles.selects}>
        {/* <Link className={styles.local} href={"/register/local"}><span>We T 회원가입</span></Link> */}
        <button className={styles.google} onClick={() => signIn('google')}><span>구글 회원 가입</span></button>
      </div>

    </div>
  );
}