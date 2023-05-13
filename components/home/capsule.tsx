import { MouseEvent, useEffect, useState } from "react";
import styles from "styles/Home.module.scss";

const categoryGroup = [
    {
        id:"all",
        text:"전체",
        active: true,
    },
    {
        id:"netflix",
        text:"NETFLIX",
        active: false,
    },
    {
        id:"tving",
        text:"TVING",
        active: false,
    },
    {
        id:"wave",
        text:"WAVE",
        active: false,
    },
    {
        id:"disney plus",
        text:"DISNEY PLUS",
        active: false,
    }
]

export default function Capsule(){
    const [categorys, setCategory] = useState(categoryGroup);
    const onHandleCategory = (event: MouseEvent<HTMLLIElement>) =>{
        const _id = event.currentTarget.id;
        setCategory(
            categorys.map((el) => ({
              ...el,
              active: el.id === _id,
            }))
        );
    }
    
    useEffect(() => {
    }, [categorys]);

    return(
        <div id={styles.main_cateogry}>
            <ul className={styles.items}>
                {categorys ? categorys.map((el, index)=>{
                    return(
                        <li 
                            key={el.id + index + "ID"}
                            id={el.id} 
                            className={`${styles.item} ${el.active && styles.active}`}
                            onClick={(e)=> onHandleCategory(e)}>
                            <button>
                                <span>{el.text}</span>
                            </button>
                        </li>
                    )
                }): null}
            </ul>
        </div>
    )
}