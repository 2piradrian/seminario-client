import RegisterForm from "../../components/molecules/register-form/register-form";
import { ViewModel } from "./viewmodel";
import Layout from "../../layout/layout";

export default function RegisterRoute() {

    const { onSubmit, isSubmitting } = ViewModel();
    
    return (
        <Layout withHeader={false}>
            <RegisterForm  
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
            />
        </Layout>
    )
}