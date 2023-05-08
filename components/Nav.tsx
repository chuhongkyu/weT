import styles from "styles/Layout.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav(){
    const route = useRouter()
    const onHandleBack = ()=>{
        history.back()
    }
    return (
        <div id={styles.Nav}>
            <nav>
                <div className={styles.left}>
                    We T
                </div>
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
                            <li className={route.asPath === "/write" ? styles.active : ''}>
                                <Link href={'/write'}>글쓰기</Link>
                            </li>
                            <li>
                                <Link href={'/home'}>고객센터</Link>
                            </li>
                        </>
                    )}
                </ul>
                <div className={styles.right}>
                    <span>💿</span>
                    <span>📞</span>
                </div>
            </nav>
        </div>
    )
}