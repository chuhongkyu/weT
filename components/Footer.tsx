import styles from "styles/Layout.module.scss";
import Link from "next/link";

export default function Footer(){
    return(
        <div id={styles.Footer}>
            <div className={styles.wrapper}>
                <ul className={styles.top}>
                    <li className={styles.logo}>
                        <Link href={'/home'}>We T</Link>
                    </li>
                    <li>
                        <Link href={'/home'}>기업소개</Link>
                    </li>
                    <li>
                        <Link href={'/home'}>고객센터</Link>
                    </li>
                    <li>
                        <Link href={'/home'}>이용약관</Link>
                    </li>
                    <li>
                        <Link href={'/home'}>개인정보처리방침</Link>
                    </li>
                </ul>
                <p className={styles.bottom}>
                    (주)미스터추 (대표이사:추홍규) | 서울특별시 마포구 추홍규 300 롯데월드타워 18층 | 통신판매번호 : 010-서울마파-3147
                    <br/>
                    유료직업소개사업등록번호 : (국내) 제$$$-$$$302-14-5-00018호 | 사업자등록번호 : 25-865-202151 | 02-0090-0000
                    <br/>
                    © MR.CHU, Inc.
                </p>
            </div>
        </div>
    )
}