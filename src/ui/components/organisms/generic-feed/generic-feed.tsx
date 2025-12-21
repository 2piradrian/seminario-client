import ProfileCard from "../../molecules/profile-card/profile-card";
import type { Event, Post, PostType, User, Vote } from "../../../../domain";
import GenericList from "../generic-list/generic-list";
import CreateButton from "../../molecules/create-button/create-button";
import style from "./style.module.css";

type Props = {
    user: User;
    items: Array<any>;
    postTypes?: PostType[];
    onClickOnAvatarItem: (item:any) => void;
    onClickOnItem: (item: any) => void;
    onClickOnComments?: (item:any) => void;
    handleVotePost?: (item: any, voteType: Vote) => Promise<void>;
    onProfileClick: (profileId: string) => void;
    onClickDelete: (item: any) => void;
    onClickCancel: (item: any) => void;
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

            <div className={style.feed}>
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
                    />
            </div>

            <div className={style.rightBlock}>
                <div className={style.placeholderCard}>
                    <h3>Notas del staff</h3>
                    <ul>
                        <li>💡 Tip: Sigue a otras cuentas para ver sus publicaciones.</li>
                        <li>🚀 Nuevo: Envía mensajes a otras personas.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
