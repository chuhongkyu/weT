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
            <section className="mx-8 max-w-5xl py-20 sm:mx-auto">
                <h1 className="text-xl py-6">😁 마이 페이지</h1>
                <p>{session.user.name}</p>
                <p>{session.user.email}</p>
            </section>
        </MainLayOut>
    )
}

export default MyPage;


