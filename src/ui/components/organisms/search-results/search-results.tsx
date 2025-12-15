import Loading from "../../atoms/loading/loading";
import NoResults from "../../atoms/no-results/no-results";
import SearchPostItem from "../../molecules/search-post-item/search-post-item";
import SearchUserItem from "../../molecules/search-user-item/search-user-item";
import SearchPageItem from "../../molecules/search-page-item/search-page-item";
import SearchEventItem from "../../molecules/search-event-item/search-event-item";
import style from "./style.module.css";
import { ContentType, type Event, type PageProfile, type Post, type Profile, type User } from "../../../../domain";

type Props = {
    loading: boolean;
    searchAttempted: boolean;
    hasResults: boolean;
    activeTab: string;
    shouldShowEmpty: boolean;
    posts: Post[];
    users: User[];
    pages: PageProfile[];
    events: Event[];
    onClickOnPost: (postId: string) => void;
    onClickOnProfile: (profile: Profile) => void;
    onClickOnEvent: (eventId: string) => void;
    toggleFollow: (profile: Profile) => void;
};

export default function SearchResults({
    loading,
    activeTab,
    shouldShowEmpty,
    posts,
    users,
    pages,
    events,
    onClickOnPost,
    onClickOnProfile,
    onClickOnEvent,
    toggleFollow
}: Props) {
    if (loading) return <Loading />;

    return (
        <div className={style.container}>
            {shouldShowEmpty ? (
                <NoResults />
            ) : (
                <div className={style.list}>
                    {activeTab === ContentType.POSTS &&
                        posts.map((post) => (
                            <SearchPostItem
                                key={post.id}
                                post={post}
                                onClickOnPost={() => onClickOnPost(post.id)}
                            />
                        ))}
                    {activeTab === ContentType.USERS &&
                        users.map((user) => (
                            <SearchUserItem
                                key={user.id}
                                user={user}
                                onViewProfile={onClickOnProfile}
                                onToggleFollow={toggleFollow}
                            />
                        ))}
                    {activeTab === ContentType.PAGES &&
                        pages.map((page) => (
                            <SearchPageItem
                                key={page.id}
                                page={page}
                                onViewProfile={onClickOnProfile}
                                onToggleFollow={toggleFollow}
                            />
                        ))}
                    {activeTab === ContentType.EVENTS &&
                        events.map((event) => (
                            <SearchEventItem
                                key={event.id}
                                event={event}
                                onClickOnEvent={() => onClickOnEvent(event.id)}
                            />
                        ))}
                </div>
            )}
        </div>
    );
}
