import ProfileCard from "../../molecules/profile-card/profile-card";
import PostsList from "../posts-list/posts-list";
import type { Event, PageProfile, Post, User, Vote } from "../../../../domain";
import CreateButton from "../../molecules/create-button/create-button";
import style from "./style.module.css";
import EventList from "../event-list/event-list";

type Props = {
    user: User;
    onProfileClick: (profileId: string) => void;
    posts: Post[];
    events: Event[];
    onClickOnPost: (postId: string) => void;
    onClickOnEvent: (eventId: string) => void;
    onClickOnComments: (postId: string) => void;
    handleVotePost: (postId: string, voteType: Vote) => Promise<void>;
    onClickOnAvatarPost: (post: Post) => void;
    onClickOnAvatarEvent: (event: Event) => void;
};

export default function PagesFeed({
    user,
    onProfileClick,
    posts, 
    events,
    onClickOnPost,
    onClickOnEvent,
    onClickOnComments,
    handleVotePost,
    onClickOnAvatarPost,
    onClickOnAvatarEvent,
}: Props) {

  return (
    <div className={style.container}>
        <div className={style.profileBlock}>
            <ProfileCard
            profile={user.profile}
            onClickOnAvatar={() => onProfileClick(user.id)}
            />
        </div>
        <div className={style.pageFeed}>
            <PostsList
                onClickOnAvatar={onClickOnAvatarPost}
                onClickOnComments={onClickOnComments}
                handleVotePost={handleVotePost}
                posts={posts}
                onClickOnPost={onClickOnPost}
            />
            <EventList
                events={events}
                onClickOnEvent={onClickOnEvent}
                onClickOnAvatar={onClickOnAvatarEvent}
            />
        </div>
    </div>
  );
}
