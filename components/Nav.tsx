import styles from "styles/Layout.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { RecoilState, useRecoilState } from "recoil";
import { menuState } from "utils/atom";
import Menu from "./Menu";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { lockScroll, unlockScroll} from "utils/help"


export default function Nav(){
    const [menu, setMenu] = useRecoilState(menuState)
    const route = useRouter()
    const onHandleBack = ()=>{
        history.back()
    }
    const { data: session, status } = useSession()

    const onClick = () => {
        setMenu((prev) => !prev)
    }

    useEffect(()=>{
        if(window != undefined){
            let position = window.scrollY
            menu ? lockScroll(position) : unlockScroll(position);
        }
        
    },[menu])

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
                                </li> : 
                                <li>
                                    <Link href={'/login'}>글쓰기</Link>
                                </li>
                            }
                            <li className={route.asPath === "/contents" ? styles.active : ''}>
                                <Link href={'/contents'}>콘텐츠</Link>
                            </li>
                        </>
                    )}
                </ul>
                <div className={styles.right}>
                    {session ? <span className={styles.log_out} onClick={()=> signOut()}>로그아웃</span> : 
                    (
                    <>
                        <Link href={'/login'}><span>로그인</span></Link>
                        <Link href={'/register'}><span>회원가입</span></Link>
                    </>
                    )}
                    <div className={styles.more_btn} onClick={onClick}>
                        <span><Image layout="fill" src="/icon/more.png" alt="icon"/></span>
                    </div>
                    
                </div>
            </nav>
            {menu ? (
                <>
                    <motion.div 
                        id={styles.Dimmed} 
                        onClick={onClick}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.3}}
                    />    
                    <Menu key={"menu"}>
                        <div className={styles.btn_container}>
                            <span className={styles.x_btn} onClick={onClick}>
                                <Image layout="fill" src="/icon/x-btn.png" alt="x-btn"/>
                            </span>
                        </div>
                        <li><Link href={'/home'}>홈</Link></li>  
                        {session ?
                            <li><Link href={'/write'}>글쓰기</Link></li> : 
                            <li><Link href={'/login'}>글쓰기</Link></li>
                        }
                        <li><Link href={'/contents'}>콘텐츠</Link></li>
                    </Menu>
                </>
                ) : null}
        </div>
    )
}