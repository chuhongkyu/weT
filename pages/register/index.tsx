import SelectContainer from "components/register/SelectContainer";
import MainLayOut from "components/common/MainLayOut";

export default function Register() {
    return (
        <MainLayOut>
            <section className="mx-8 max-w-5xl py-20 sm:mx-auto">
                <SelectContainer/>
            </section>
        </MainLayOut>
    )
}