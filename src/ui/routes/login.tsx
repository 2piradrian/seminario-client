import LoginForm from "../components/molecules/login-form/login-form";
import Layout from "../layout/layout";

export default function LoginRoute() {
    return (
        <Layout>
            <LoginForm  onSubmit={() => alert("Login clicked")} />
        </Layout>
    )
}