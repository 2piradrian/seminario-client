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
    searchAttempted,
    hasResults,
    activeTab,
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

    const renderList = () => {
        switch (activeTab) {
            case ContentType.POSTS:
                return posts.map((post) => (
                    <SearchPostItem
                        key={`post-${post.id}`}
                        post={post}
                        onClickOnPost={() => onClickOnPost(post.id)}
                    />
                ));
            case ContentType.USERS:
                return users.map((user) => (
                    <SearchUserItem
                        key={`user-${user.id}`}
                        user={user}
                        onViewProfile={onClickOnProfile}
                        onToggleFollow={toggleFollow}
                    />
                ));
            case ContentType.PAGES:
                return pages.map((page) => (
                    <SearchPageItem
                        key={`page-${page.id}`}
                        page={page}
                        onViewProfile={onClickOnProfile}
                        onToggleFollow={toggleFollow}
                    />
                ));
            case ContentType.EVENTS:
                return events.map((event) => (
                    <SearchEventItem
                        key={`event-${event.id}`}
                        event={event}
                        onClickOnEvent={() => onClickOnEvent(event.id)}
                    />
                ));
            default:
                return [];
        }
    };

    const currentLength = (() => {
        switch (activeTab) {
            case ContentType.POSTS: return posts.length;
            case ContentType.USERS: return users.length;
            case ContentType.PAGES: return pages.length;
            case ContentType.EVENTS: return events.length;
            default: return 0;
        }
    })();

    const shouldShowEmpty = searchAttempted && (!hasResults || currentLength === 0);

    return (
        <div className={style.container}>
            {shouldShowEmpty ? (
                <NoResults />
            ) : (
                <div className={style.list}>
                    {renderList()}
                </div>
            )}
        </div>
    );
}
