import styles from "styles/Detail.module.scss"

interface IData {
    id: string;
    comment: string;
    email: string;
}

export default function SmallComment(props:IData){
    const { id, comment, email  } = props;
    return(
        <div id={id} className={styles.small_comment_list}>
            <div className={styles._email}>{email.length > 6 ? email.substring(0,6) + "...": email}</div>
            <div className={styles._desc}>{comment}</div>
        </div>
    )
}