import styles from "styles/Layout.module.scss"

export default function Loading(){
    return(
        <div id={styles.Loading}>
            <div className={styles.loadingRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}