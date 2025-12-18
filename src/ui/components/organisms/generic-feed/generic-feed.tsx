import ProfileCard from "../../molecules/profile-card/profile-card";
import type { Event, Post, PostType, User, Vote } from "../../../../domain";
import GenericList from "../generic-list/generic-list";
import style from "./style.module.css";
import CreateButton from "../../molecules/create-button/create-button";

type Props = {
    user: User;
    items: Array<Event | Post>;
    postTypes?: PostType[];
    onClickOnAvatarItem: (item: Event | Post) => void;
    onClickOnItem: (item: Event | Post) => void;
    onClickOnComments?: (item: Event | Post) => void;
    handleVotePost?: (item: Event | Post, voteType: Vote) => Promise<void>;
    onProfileClick: (profileId: string) => void;
    onClickDelete: (item: Event | Post) => void;
    onClickCancel: (item: Event | Post) => void;
    isPost: (item: Event | Post) => item is Post;
    isEvent: (item: Event | Post) => item is Event;
    onClickOnCreateItem?: () => void;
    createButtonText?: string;
};


export default function GenericFeed({
    user,
    items,
    postTypes,
    onClickOnAvatarItem,
    onClickOnItem,
    onClickOnComments,
    handleVotePost,
    onProfileClick,
    onClickCancel,
    onClickDelete,
    isEvent,
    isPost,
    onClickOnCreateItem,
    createButtonText
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
                {onClickOnCreateItem && (
                    <div className={style.createPostWrapper}>
                        <CreateButton
                            profile={user.toProfile()}
                            onClickOnAvatar={() => onProfileClick(user.id)}
                            onClickOnCreate={onClickOnCreateItem}
                            text={createButtonText}
                        />
                    </div>
                    )}
                    <GenericList
                        items={items}
                        postTypes={postTypes}
                        onClickOnItem={onClickOnItem}
                        onClickOnAvatar={onClickOnAvatarItem}
                        onClickOnComments={onClickOnComments}
                        onVote={handleVotePost}
                        onClickDelete={onClickDelete}
                        onClickCancel={onClickCancel}
                        isPost={isPost}
                        isEvent={isEvent}
                    />
                </div>
            </div>
    );
}
