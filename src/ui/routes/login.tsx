import MainButton from "../components/atoms/main-button/main-button";
import Layout from "../layout/layout";

export default function LoginRoute() {
    return (
        <Layout>
            <MainButton text="Login" onClick={() => alert("Login clicked")} />
        </Layout>
    )
}