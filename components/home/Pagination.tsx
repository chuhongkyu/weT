import React from "react";

interface IProps {
    pageNumbers: number[];
    currentNumber: number; 
    handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Pagination({ pageNumbers, currentNumber, handleClick }: IProps){
    return(
        <div className="py-4 flex justify-center">
            <ul className="flex gap-3 text-sm">
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            className={`text-gray-600 ${currentNumber === number ? '' : 'opacity-50'}`   }
                            value={number}
                            onClick={handleClick}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}