import EventsFeed from "../../components/organisms/events-feed/events-feed";
import PostsFeed from "../../components/organisms/posts-feed/posts-feed";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function EventsRoute() {
    const { events, onClickOnCreateEvent, onClickOnEvent, onProfileClick, user, onLogout, onClickOnAvatar } = ViewModel();

    return(
        <Layout 
            withHeader
            headerProfile={user ? user.toProfile() : undefined}
            onLogout={onLogout}
        >
            { user &&
                    <EventsFeed
                       events={events}
                       onClickOnCreateEvent={onClickOnCreateEvent}
                       onClickOnEvent={onClickOnEvent}
                       onProfileClick={onProfileClick}
                       user={user}
                       onClickOnAvatar={onClickOnAvatar}
                    />
                  }
        </Layout>
    )
}