import styles from "styles/Home.module.scss";
import Link from "next/link";
import { useEffect } from "react";
import { IData } from "utils/typeGroup";

interface IListProps {
  data: IData[];
}

export default function List({ data }: IListProps) {
  return (
    <div className={styles.list_container}>
      <ul className={styles.items}>
        {data
          ? data.map((item: IData) => (
              <li key={item._id} className={styles.item}>
                <Link href={`/detail/${item._id}`}>
                  <h5 className={styles.title}>{item.title}</h5>
                  <p className={styles.content}>{item.content}</p>
                  <div className={styles.container_bottom}>
                    <p className={styles.date}>{item.time}</p>
                  </div>
                </Link>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
