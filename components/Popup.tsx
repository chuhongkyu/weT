import { useRef, useState } from "react"

export function Popup(){
    const [open, setOpen] = useState(true)
    return(
        <>
        {open ?
            <div id="default-modal" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center w-full md:inset-0 h-[calc(100%-0.5rem)] max-h-full flex flex-col items-center">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                알림
                            </h3>
                            <button onClick={()=> setOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                    
                        <div className="p-4 md:p-5 space-y-4">
                            <p className="text-base leading-relaxed text-gray-500">
                                현재 vercel 페이지 - 로컬 회원가입, 로컬 로그인이 작동되지 않습니다.<br/>
                                구글 로그인으로 부탁드립니다.<br/>
                                로컬 회원가입, 로컬 로그인을 원하시는 분들은 프로덕션 페이지를 이용해주세요.
                            </p>
                            <br/>
                            <a href="http://ott-we-t.com/" target="_blank" className="text-base leading-relaxed text-gray-700 underline">
                                프로덕션 페이지로 가기 (http://ott-we-t.com/)
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            : null}
        </>
    )
}