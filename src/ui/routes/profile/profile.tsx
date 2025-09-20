import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function ProfileRoute(){

    const {} = ViewModel();

    return (
        <Layout withHeader={true}>
            <p>Test</p>
        </Layout>
    )

}