import PagesFeed from "../../components/organisms/pages-feed/pages-feed";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function PagesRoute() {
    const { 
        events,
        handleVotePost,
        onClickOnAvatarEvent,
        onClickOnComments,
        onClickOnEvent,
        onClickOnAvatarPost,
        onProfileClick,
        onClickOnPost,
        posts,
        user,
        onLogout
    } = ViewModel();
    
        return(
            <Layout 
                withHeader
                headerProfile={user ? user.toProfile() : undefined}
                onLogout={onLogout}
            >
                { user &&
                        <PagesFeed
                            events={events}
                            handleVotePost={handleVotePost}
                            onClickOnAvatarEvent={onClickOnAvatarEvent}
                            onClickOnAvatarPost={onClickOnAvatarPost}
                            onClickOnComments={onClickOnComments}
                            onClickOnEvent={onClickOnEvent}
                            onClickOnPost={onClickOnPost}
                            onProfileClick={onProfileClick}
                            posts={posts}
                            user={user}
                        />
                      }
            </Layout>
        )
}