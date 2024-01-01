import LoginContainer from "components/login/LoginContainer"
import MainLayOut from "components/MainLayOut";

export default function Login() {

  return (
    <MainLayOut>
      <section className="mx-8 max-w-5xl py-20 sm:mx-auto">
        <LoginContainer/>
      </section>
    </MainLayOut>
  )
}