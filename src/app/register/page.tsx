import SelectContainer from "src/app/_components/register/SelectContainer";
import MainLayOut from "src/app/_components/common/MainLayOut";

export default function Register() {
    return (
        <MainLayOut>
            <section className="mx-8 max-w-5xl py-20 sm:mx-auto">
                <SelectContainer/>
            </section>
        </MainLayOut>
    )
}