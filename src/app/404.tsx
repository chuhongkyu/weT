
import MainLayOut from "src/app/_components/common/MainLayOut"
import Link from "next/link"

export default function Custom404() {
    return (
        <MainLayOut>
            <section className="flex justify-center items-center h-[500px] p-16 bg-gray-50">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col gap-6 max-w-md text-center">
                        <h2 className="font-extrabold text-9xl text-gray-600">
                            <span className="sr-only">404 - Page Not Found</span>
                        </h2>
                        <p className="text-2xl md:text-3xl">죄송합니다. 404</p>
                        <Link className="px-8 py-4 text-xl font-semibold rounded bg-cyan-500 text-gray-50 hover:text-gray-200" href={"/"}> 돌아가기 </Link>
                    </div>
                </div>
            </section>
        </MainLayOut>
    )
}