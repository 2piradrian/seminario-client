import RegisterForm from "../../components/molecules/register-form/register-form";
import { ViewModel } from "./viewmodel";
import Layout from "../../layout/layout";

export default function RegisterRoute() {

    const { 
        onSubmit, 
        isSubmitting,
        showPassword,
        onClickPassword
    } = ViewModel();
    
    return (
        <Layout withHeader={false}>
            <RegisterForm  
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
                showPassword={showPassword}
                onClickPassword={onClickPassword}
            />
        </Layout>
    )
}
