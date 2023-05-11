import styles from "styles/Login.module.scss";
import Nav from 'components/Nav';
import LoginContainer from "components/login/LoginContainer"
import Footer from "components/Footer"

export default function Login() {

  return (
    <div id={styles.Login}>
      <Nav/>
      <div className={styles.wrapper}>
        <LoginContainer/>
      </div>
      <Footer/>
    </div>
  )
}