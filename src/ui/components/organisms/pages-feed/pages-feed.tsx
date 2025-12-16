import ProfileCard from "../../molecules/profile-card/profile-card";
import type { Event, Post, PostType, User, Vote } from "../../../../domain";
import style from "./style.module.css";
import GenericList from "../generic-list/generic-list";

type Props = {
    user: User;
    items: Array<Event | Post>;
    postTypes: PostType[];
    onClickOnAvatarItem: (item: Event | Post) => void;
    onClickOnItem: (item: Event | Post) => void;
    onClickOnComments: (item: Event | Post) => void;
    handleVotePost: (item: Event | Post, voteType: Vote) => Promise<void>;
    onProfileClick: (profileId: string) => void;
    onClickDelete: (item: Event | Post) => void;
    onClickCancel: (item: Event | Post) => void;
};


export default function PagesFeed({
    user,
    items,
    postTypes,
    onClickOnAvatarItem,
    onClickOnItem,
    onClickOnComments,
    handleVotePost,
    onProfileClick,
    onClickCancel,
    onClickDelete
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
                <GenericList
                    items={items}
                    postTypes={postTypes}
                    onClickOnItem={onClickOnItem}
                    onClickOnAvatar={onClickOnAvatarItem}
                    onClickOnComments={onClickOnComments}
                    onVote={handleVotePost}
                    onClickDelete={onClickDelete}
                    onClickCancel={onClickCancel}
                />
            </div>
        </div>
    );
}
