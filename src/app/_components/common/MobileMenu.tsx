import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";


const MobileMenu = () => {
    const { data: session } = useSession()
    const pathname = usePathname()
    return(
        <div className="mobile-menu md:hidden right-2 z-10 bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-44 ">
            <ul 
                className="text-sm"
                >    
                <li>
                    <Link href="/" className={`block px-4 py-2 ${pathname == "/" ? "text-cyan-500 active" : "text-gray-900 md:bg-transparent md:hover:text-cyan-500"}`} aria-current="page">홈</Link>
                </li>
                <li>
                    <Link href="/recommend" className={`block px-4 py-2 ${pathname == "/recommend" ? "text-cyan-500 active" : "text-gray-900 md:hover:bg-transparent md:hover:text-cyan-500"}`}>나만의 OTT</Link>
                </li>
                <li>
                    <Link href="/write" className={`block px-4 py-2 ${pathname == "/write" ? "text-cyan-500 active" : "text-gray-900 md:hover:bg-transparent md:hover:text-cyan-500"}`}>글쓰기</Link>
                </li>
                {session?.user?.email ? 
                <>
                    <li>
                        <span className={`block px-4 py-2 cursor-pointer text-gray-900 md:hover:bg-transparent md:hover:text-cyan-500`} onClick={()=> signOut()}>로그아웃</span>
                    </li>
                </>: 
                <>
                    <li>
                        <Link href="/login" className={`block px-4 py-2 ${pathname == "/login" ? "text-cyan-500 active" : "text-gray-900 md:hover:bg-transparent md:hover:text-cyan-500"}`}>로그인</Link>
                    </li>
                    <li>
                        <Link href="/register" className={`block px-4 py-2 ${pathname == "/register" ? "text-cyan-500 active" : "text-gray-900 md:hover:bg-transparent md:hover:text-cyan-500"}`}>회원가입</Link>
                    </li>
                </>}
            </ul>
        </div>  
    )
}

export default MobileMenu