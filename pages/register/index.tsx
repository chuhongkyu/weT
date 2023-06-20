import Nav from "components/Nav";
import Footer from "components/Footer"
import styles from "styles/Register.module.scss";
import SelectContainer from "components/register/SelectContainer";

export default function Register() {
    return (
        <div id={styles.Register}>
            <Nav/>
            <div className={styles.wrapper}>
                <SelectContainer/>
            </div>
            <Footer/>
        </div>
    )
}