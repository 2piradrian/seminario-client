import NotificationList from "../../components/organisms/notification-list/notification-list";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function NotificationsRoute() {

    const { 
        loading,
        notifications
    } = ViewModel();

    return(
        <Layout withHeader={true}>
            { !loading && 
                <NotificationList 
                    notifications={notifications}
                />       
            }
        </Layout>
    )
}