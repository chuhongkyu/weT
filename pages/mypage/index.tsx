import MainLayOut from "components/MainLayOut";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MyPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    useEffect(() => {
        if (!session?.user) {
          router.push('/login');
        }
    }, [session, router]);
    
    if (!session?.user) {
        return null;
    }
    return(
        <MainLayOut>
            <section className="mx-8 max-w-5xl py-20 sm:mx-auto flex justify-center">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        😁 마이 페이지
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                            <div>
                                  <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="name">이름</label>
                                  <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5"
                                    id="name"
                                    name="name"
                                    type="text"
                                    readOnly
                                    value={session.user.name + ''}
                                  />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="email">이메일</label>
                                <input 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5"
                                    name="email_title"
                                    id="email_title"
                                    type="text"
                                    readOnly
                                    value={session.user.email + ''}
                                    />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </MainLayOut>
    )
}

export default MyPage;


