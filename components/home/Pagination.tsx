import React from "react";
import styles from "styles/Home.module.scss";

interface IProps {
    pageNumbers: number[];
    currentNumber: number; 
    handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Pagination({ pageNumbers, currentNumber, handleClick }: IProps){
    return(
        <div id={styles.Pagination}>
            <ul className={styles.pagination}>
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            className={currentNumber === number ? styles.active : ''}
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