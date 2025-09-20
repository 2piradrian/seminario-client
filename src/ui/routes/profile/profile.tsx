import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function ProfileRoute(){

    const {} = ViewModel();

    return (
        <Layout withHeader={true}>
            <ProfileHeader/>
        </Layout>
    )

}