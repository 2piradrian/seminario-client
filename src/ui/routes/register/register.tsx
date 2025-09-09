import Layout from "../../layout/layout";
import { ViewModel } from "./viewmodel";
import RegisterForm from "../../components/molecules/register-form/register-form";

export default function RegisterRoute() {
    const { } = ViewModel();
    
        return (
            <Layout withHeader={false}>
                <RegisterForm  
                    onSubmit={() => alert("Register clicked")} 
                />
            </Layout>
        )
}