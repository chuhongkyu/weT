import styles from "styles/Layout.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export default function Nav(){
    const route = useRouter()
    const onHandleBack = ()=>{
        history.back()
    }
    const { data: session, status } = useSession()

    return (
        <div id={styles.Nav}>
            <nav>
                <Link href={'/home'}>
                    <div className={styles.left}>
                        We T
                    </div>
                </Link>
                <ul className={styles.main}>
                    {route.pathname === '/detail/[idx]' || route.pathname === '/edit/[idx]' 
                    ? (
                        <>
                            <li className={styles.arrow_left}>
                                <a onClick={onHandleBack}></a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className={route.asPath === "/home" ? styles.active : ''}>
                                <Link href={'/home'}>홈</Link>
                            </li>
                            {session ?
                                <li className={route.asPath === "/write" ? styles.active : ''}>
                                    <Link href={'/write'}>글쓰기</Link>
                                </li> : null
                            }
                            <li>
                                <Link href={'/home'}>고객센터</Link>
                            </li>
                        </>
                    )}
                </ul>
                <div className={styles.right}>
                    {session ? <span className={styles.log_out} onClick={()=> signOut()}>로그아웃</span> : 
                    (
                    <>
                        <Link href={'/login'}><span>로그인</span></Link>
                        <Link href={'/login'}><span>회원가입</span></Link>
                    </>
                    )}
                </div>
            </nav>
        </div>
    )
}