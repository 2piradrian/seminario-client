import Loading from "../../atoms/loading/loading";
import NoResults from "../../atoms/no-results/no-results";
import SearchResultCard from "../../molecules/search-result-card/search-result-card";
import TimeAgo from "../../atoms/time-ago/time-ago";
import style from "./style.module.css";
import userIcon from "../../../assets/icons/person.svg";
import postIcon from "../../../assets/icons/musical-note-music-svgrepo-filled.svg";
import pageIcon from "../../../assets/icons/profile.svg";
import eventIcon from "../../../assets/icons/calendar.svg";
import { formatShortDate } from "../../../../core/utils/formatters";
import { ContentType, type Event, type PageProfile, type Post, type User } from "../../../../domain";

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
    onClickOnProfile: (profile) => void;
    onClickOnEvent:(eventId: string) => void;
    toggleFollow: (profile) => void;
};

const shorten = (text?: string, max = 140) => {
    if (!text) return "";
    return text.length > max ? `${text.slice(0, max)}...` : text;
};

const dateRangeLabel = (start?: Date, end?: Date) => {
    if (!start && !end) return "";
    if (start && end) return `${formatShortDate(start)} - ${formatShortDate(end)}`;
    return formatShortDate((start ?? end) as Date);
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
    toggleFollow,
}: Props) {
    if (loading) {
        return <Loading />;
    }

    const buildResults = () => {
        switch (activeTab) {
            case ContentType.POSTS:
                return posts.map((post) => ({
                    id: post.id,
                    title: post.title,
                    description: shorten(post.content),
                    subtitle: post.postType?.name,
                    badgeLabel: "Post",
                    badgeIcon: postIcon,
                    imageId: post.imageId,
                    meta: [
                        <TimeAgo key="time" createdAt={post.createdAt} />,
                        post.pageProfile?.name
                    ].filter(Boolean),
                    actionLabel: "Ver post",
                    onAction: () => onClickOnPost(post.id)
                }));

            case ContentType.USERS:
                return users.map((user) => {
                    const profile = user.toProfile();
                    const isOwn = user.profile?.isOwnProfile ?? false;
                    return {
                        id: user.id,
                        title: profile.displayName,
                        description: shorten(profile.shortDescription),
                        subtitle: "Usuario",
                        badgeLabel: "Usuario",
                        badgeIcon: userIcon,
                        imageId: profile.profileImage,
                        meta: [
                            user.profile?.followersQuantity !== undefined
                                ? `${user.profile.followersQuantity} seguidores`
                                : undefined
                        ].filter(Boolean),
                        actionLabel: "Ver perfil",
                        onAction: () => onClickOnProfile(profile),
                        secondaryLabel: isOwn ? undefined : (profile.isFollowing ? "Siguiendo" : "Seguir"),
                        isSecondaryActive: profile.isFollowing,
                        onSecondary: isOwn ? undefined : () => toggleFollow(profile),
                    };
                });

            case ContentType.PAGES:
                return pages.map((page) => {
                    const profile = page.toProfile();
                    return {
                        id: page.id,
                        title: page.name,
                        description: shorten(page.shortDescription),
                        subtitle: page.pageType?.name,
                        badgeLabel: "Página",
                        badgeIcon: pageIcon,
                        imageId: page.profileImage,
                        meta: [
                            page.followersQuantity !== undefined
                                ? `${page.followersQuantity} seguidores`
                                : undefined,
                            page.members?.length
                                ? `${page.members.length} miembros`
                                : undefined
                        ].filter(Boolean),
                        actionLabel: "Ver página",
                        onAction: () => onClickOnProfile(profile),
                        secondaryLabel: profile.isFollowing ? "Siguiendo" : "Seguir",
                        isSecondaryActive: profile.isFollowing,
                        onSecondary: () => toggleFollow(profile),
                    };
                });

            case ContentType.EVENTS:
                return events.map((event) => ({
                    id: event.id,
                    title: event.title,
                    description: shorten(event.content),
                    subtitle: "Evento",
                    badgeLabel: "Evento",
                    badgeIcon: eventIcon,
                    imageId: event.imageId,
                    meta: [
                        dateRangeLabel(event.dateInit, event.dateEnd),
                        event.assistsQuantity !== undefined
                            ? `${event.assistsQuantity} asistentes`
                            : undefined
                    ].filter(Boolean),
                    actionLabel: "Ver evento",
                    onAction: () => onClickOnEvent(event.id)
                }));

            default:
                return [];
        }
    };

    const results = buildResults();

    const shouldShowEmpty = searchAttempted && (!hasResults || results.length === 0);

    if (shouldShowEmpty) {
        return (
            <div className={style.container}>
                <NoResults />
            </div>
        );
    }
    
    return (
        <div className={style.container}>
            <div className={style.list}>
                {results.map((result) => (
                    <SearchResultCard key={`${result.badgeLabel}-${result.id}`} {...result} />
                ))}
            </div>
        </div>
    );
}
