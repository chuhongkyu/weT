function Footer(){
    return(
        <footer
            className="flex flex-col items-center text-center text-white bg-cyan-400">
                <div className="container p-6">
                    <div className="flex justify-center items-center">
                        <picture>
                            <source type="image/webp" srcSet={"/img/img_cat2.webp"}/>
                            <source type="image/jpeg" srcSet={"/img/img_cat2.jpg"}/>
                            <img className="w-6 h-6" src="/img/img_cat2.webp" alt="logo"/>
                        </picture>
                        <p className="pl-2 flex items-center justify-center">
                            <span className="mr-4">사업자등록번호 : 25-865-202151</span>
                        </p>
                    </div>
                </div>

                <div
                    className="w-full p-4 text-center bg-cyan-600">
                    © MR.CHU, Inc.
                    <a target="_blank" href="https://mrchu.netlify.app" rel="noopener noreferrer" className="pl-4 text-white">(주)미스터추 (개발자:추홍규)</a>
                </div>
        </footer>
    )
}

export default Footer