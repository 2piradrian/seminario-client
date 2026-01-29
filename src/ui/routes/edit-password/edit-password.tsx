import EditPasswordForm from "../../components/molecules/edit-password-form/edit-password-form";
import Layout from "../../layout/layout";
import { ViewModel } from "./viewmodel";

export default function EditPasswordRoute() {

    const { 
        onSubmit, 
        isSubmitting,
        showPassword,
        showConfirmPassword,
        onClickPassword,
        onClickConfirmPassword
    } = ViewModel();

    return (
        <Layout withHeader={false}>
            <EditPasswordForm 
                onSubmit={onSubmit} 
                isSubmitting={isSubmitting}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                onClickPassword={onClickPassword}
                onClickConfirmPassword={onClickConfirmPassword}
            />
        </Layout>
    )
}
