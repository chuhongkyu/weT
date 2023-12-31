import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Menu from "./Menu";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { lockScroll, unlockScroll} from "utils/help"
import { usePathname } from "next/navigation";


export default function Nav(){
    const [menu, setMenu] = useState(false)
    const pathname = usePathname()

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
        <>
            <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 pt-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse pb-4">
                        <img src="/img/img_cat2.png" className="h-8" alt="logo"/>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">We T</span>
                    </a>

                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <div className="hidden md:flex">
                        {!session?.user ? 
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 bg-gray-50 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                            <li>
                                <Link href="login" className="block pt-2 pb-6 px-3 text-gray-900 md:hover:bg-transparent md:hover:text-cyan-500">로그인</Link>
                            </li>
                            <li>
                                <Link href="register" className="block pt-2 pb-6 px-3 text-gray-900 md:hover:bg-transparent md:hover:text-cyan-500">회원가입</Link>
                            </li>
                        </ul>
                        : 
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 bg-gray-50 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                            <li>
                                <span className="block pt-2 pb-6 px-3 text-gray-900 md:hover:bg-transparent md:hover:text-cyan-500 cursor-pointer" onClick={()=> signOut()}>로그아웃</span>
                            </li>
                        </ul>}
                        </div>
                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center px-2 pb-4 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                    </div>

                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium borde bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                            <li className="list">
                                <Link href="/" className={`block pt-2 pb-6 px-3 ${pathname == "/" ? "text-cyan-500 active" : "text-gray-900 md:bg-transparent md:hover:text-cyan-500"}`} aria-current="page">홈</Link>
                            </li>
                            <li className="list">
                                <Link href="contents" className={`block pt-2 pb-6 px-3 ${pathname == "/contents" ? "text-cyan-500 active" : "text-gray-900 md:hover:bg-transparent md:hover:text-cyan-500"}`}>나만의 OTT</Link>
                            </li>
                            <li className="list">
                                <Link href="write" className={`block pt-2 pb-6 px-3 ${pathname == "/write" ? "text-cyan-500 active" : "text-gray-900 md:hover:bg-transparent md:hover:text-cyan-500"}`}>글쓰기</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}