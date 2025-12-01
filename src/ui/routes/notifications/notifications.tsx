import NotificationList from "../../components/organisms/notification-list/notification-list";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function NotificationsRoute() {

    const { 
        loading,
        notifications,
        redirectToNotification,
        user
    } = ViewModel();

    return(
        <Layout 
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
        >
            { !loading && 
                <NotificationList 
                    notifications={notifications}
                    redirectToNotification={redirectToNotification}
                />       
            }
        </Layout>
    )
}
