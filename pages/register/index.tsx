import Nav from "components/Nav";
import Footer from "components/Footer"
import RegisterContainer from "components/register/RegisterContainer";
import styles from "styles/Register.module.scss";

export default function Register() {
    return (
        <div id={styles.Register}>
            <Nav/>
            <div className={styles.wrapper}>
                <RegisterContainer/>
            </div>
            <Footer/>
        </div>
    )
}