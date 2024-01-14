import MainLayOut from "components/MainLayOut";
import Link from "next/link";

export default function Register() {
    return (
        <MainLayOut>
            <section className="mx-8 max-w-5xl py-20 sm:mx-auto flex justify-center items-center">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                            <img className="w-8 h-8 mr-2" src="/img/img_cat2.webp" alt="logo"/>
                            WeT
                        </Link>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            축하드립니다!<br/>
                            회원가입이 되셨습니다. 
                            로그인 해주세요~
                        </h1>
                        <div className="w-full text-white bg-cyan-500 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-3 text-center">
                            <Link href="/login" >로그인 하러 가기</Link>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayOut>
    )
}