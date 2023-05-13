import { MouseEvent, useEffect, useState } from "react";
import styles from "styles/Home.module.scss";
import { IData } from "utils/typeGroup";

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

interface Props {
    onHandleCategory: (id: string) => void;
}

export default function Capsule({ onHandleCategory }: Props){
    const [categorys, setCategory] = useState(categoryGroup);
    const onHandleCategoryClick = (event: MouseEvent<HTMLLIElement>) =>{
        const _id = event.currentTarget.id;
        setCategory(
            categorys.map((el) => ({
              ...el,
              active: el.id === _id,
            }))
        );
        onHandleCategory(_id);
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
                            onClick={(e)=> onHandleCategoryClick(e)}>
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