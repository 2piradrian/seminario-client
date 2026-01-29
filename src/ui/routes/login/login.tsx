import LoginForm from "../../components/molecules/login-form/login-form";
import Layout from "../../layout/layout";
import { ViewModel } from "./viewmodel";

export default function LoginRoute() {

    const { 
        onSubmit,
        onClickPassword,
        showPassword
    } = ViewModel();

    return (
        <Layout withHeader={false}>
            <LoginForm
                onSubmit={onSubmit}
                onClickPassword={onClickPassword}
                showPassword={showPassword}
            />
        </Layout>
    )
}
