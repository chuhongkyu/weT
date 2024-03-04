'use client'
interface IComment {
    id: string;
    comment: string;
    email: string;
}

export default function SmallComment(props:IComment){
    const { id, comment, email } = props;
    return(
        <article id={id} className="py-6 mx-6 text-base comment-list">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900">
                    <img className="mr-2 w-6 h-6 rounded-full"
                        src="/img/img_cat2.jpg"
                        alt={email + "alt"}/>{email.length > 6 ? email.substring(0,6) + "...": email}</p>
                </div>
                {/* <button id="dropdownComment3Button" data-dropdown-toggle="dropdownComment3"
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                    type="button">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                      </svg>
                    <span className="sr-only">Comment settings</span>
                </button> */}
                {/* drop down */}
                {/* <div id="dropdownComment3"
                    className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow ">
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownMenuIconHorizontalButton">
                        <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100">Edit</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100">Remove</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100">Report</a>
                        </li>
                    </ul>
                </div> */}
            </footer>
            <p>{comment}</p>
            {/* <div className="flex items-center mt-4 space-x-4">
                <button type="button"
                    className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                    <svg className="mr-1.5 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z"/>
                    </svg>
                    Reply
                </button>
            </div> */}
        </article>
    )
}