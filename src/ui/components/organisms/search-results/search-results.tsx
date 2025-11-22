import Loading from "../../atoms/loading/loading";
import NoResults from "../../atoms/no-results/no-results";
import PostsList from "../posts-list/posts-list";
import ProfileList from "../profile-list/profile-list";
import { type Post, type Vote, type User, type PageProfile, type Event, ContentType } from "../../../../domain";
import style from "./style.module.css"
import EventList from "../event-list/event-list";
import TabNavigator from "../../atoms/tab-navigator/tab-navigator";
import { Tabs } from "../../../../core";

type Props = {
    loading: boolean;
    activeTab: string;
    posts: Post[];
    users: User[];
    pages: PageProfile[];
    events: Event[];
    userId?: string;
    searchAttempted: boolean;
    hasResults: boolean;
    handleVotePost: (postId: string, voteType: Vote) => Promise<void>;
    onClickOnComments: (commentId: string) => void;
    onClickOnAvatar: (post: Post) => void;
    onClickDelete: (postId: string) => void;
    onClickOnPost: (postId: string) => void;
    onClickOnProfile: (profile) => void;
    onClickOnEvent:(eventId: string) => void;
    toggleFollow: (profile) => void;
    onTabClick: (tab: string) => void;
};

export default function SearchResults({
    loading,
    activeTab,
    posts,
    users,
    pages,
    events,
    userId,
    searchAttempted,
    hasResults,
    handleVotePost,
    onClickOnComments,
    onClickOnAvatar,
    onClickDelete,
    onClickOnPost,
    onClickOnProfile,
    onClickOnEvent,
    toggleFollow,
    onTabClick
}: Props) {

    if (loading) {
        return <Loading />;
    }
    
    return (
        <div className={style.container}>
            <TabNavigator
              tabs={Tabs.results}
              activeTab={activeTab}
              onTabClick={onTabClick}
            />
            {activeTab === ContentType.POSTS && posts.length > 0 && ( <PostsList
                   posts={posts}
                   handleVotePost={handleVotePost}
                   onClickOnComments={onClickOnComments}
                   onClickOnAvatar={onClickOnAvatar}
                   onClickDelete={onClickDelete}
                   onClickOnPost={onClickOnPost}
                 />
            )}
            {activeTab === ContentType.USERS && users.length > 0 && (
              <ProfileList
                profiles={users.map((user) => user.toProfile())}
                toggleFollow={toggleFollow}
                onClickOnProfile={onClickOnProfile}
                showDescription={true}
                currentUserId={userId}
              />
            )}

            {activeTab === ContentType.PAGES && pages.length > 0 && (
              <ProfileList
                profiles={pages.map((page) => page.toProfile())}
                toggleFollow={toggleFollow}
                onClickOnProfile={onClickOnProfile}
              />
            )}
            {activeTab === ContentType.EVENTS && events.length > 0 && (
              <EventList
                events={events}
                onClickOnEvent={onClickOnEvent}
              />
            )}

              {searchAttempted && !hasResults && <NoResults />}
        </div>
    );
}
