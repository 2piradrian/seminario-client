import MediumTitle from "../../components/atoms/medium-title/medium-title";
import NotificationList from "../../components/organisms/notification-list/notification-list";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function NotificationsRoute() {

    const { 
        loading,
        notifications,
        redirectToNotification,
        user,
        onLogout,
        isJoinOpen,
        cancelJoin,
        proceedJoin
    } = ViewModel();

    return(
        <Layout 
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
        >
            { !loading && 
                <NotificationList 
                    notifications={notifications}
                    redirectToNotification={redirectToNotification}
                    isJoinOpen={isJoinOpen}
                    cancelJoin={cancelJoin}
                    proceedJoin={proceedJoin}
                />       
            }
        </Layout>
    )
}
