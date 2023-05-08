import { signIn, signOut, useSession } from 'next-auth/react'
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
        <div className={styles.box}>
            <button onClick={() => signIn('google')}>Sign in with Google</button>
        </div>
    </div>
  )
}