'use client'

import { useState } from "react"

interface IProps {
    onHandleWrite: (id:string)=> void;
    onHandleDelete: (id:string)=> void;
    id: string;
}

export const OpenBtn = ({onHandleWrite, onHandleDelete, id }:IProps) => {
    const [open, setOpen] = useState(false)
    const onOpenHandle = () => {
        setOpen(!open)
    }

    return(
        <>
              <button id="dropdownComment3Button" data-dropdown-toggle="dropdownComment3"
                  onClick={onOpenHandle}
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100"
                  type="button">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                    </svg>
                  <span className="sr-only">Settings</span>
              </button>
              {/* drop down */}
              <div id="dropdownComment3"
                  className={`${open ? '': 'hidden'} top-3/4 absolute right-0 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow`}>
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownMenuIconHorizontalButton">
                      <li onClick={()=> onHandleWrite(id)}>
                          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">Edit</a>
                      </li>
                      <li onClick={()=> onHandleDelete(id)}>
                          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">Remove</a>
                      </li>
                  </ul>
              </div>
              </>
    )
}