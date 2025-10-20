import PostsList from "../posts-list/posts-list";
import UserProfileDetail from "../user-profile-detail/user-profile-detail";
import Modal from "../../molecules/modal/modal";
import type { PageProfile, Post, UserProfile, Vote } from "../../../../domain";
import PageDetail from "../page-detail/page-detail";
import style from "./style.module.css"

type Props = {
    userProfile?: UserProfile;
    pageProfile?: PageProfile; 
    posts: Post[];
    isMine: boolean;
    onClickOnPost: (postId: string) => void;
    onClickOnComments: (postId: string) => void;
    handleVotePost: (postId: string, voteType: Vote) => Promise<void>;
    onClickOnAvatar: (post: Post) => void;
    isDeleteOpen: boolean;
    onClickDelete: (postId: string) => void;
    cancelDelete: () => void;
    proceedDelete: () => void;
    onClickOnMember?: (profileId: string) => void;
};

export default function ProfileFeed({
    userProfile,
    pageProfile,
    posts,
    isMine,
    onClickOnPost,
    onClickOnComments,
    handleVotePost,
    onClickOnAvatar,
    isDeleteOpen,
    onClickDelete,
    cancelDelete,
    proceedDelete,
    onClickOnMember
}: Props) {

    return(
        <div className={style.container}>
            {userProfile ? <UserProfileDetail profile={userProfile} /> : pageProfile && <PageDetail page={pageProfile} onClickOnMember={onClickOnMember}/>}
            <PostsList 
                onClickOnAvatar={onClickOnAvatar}
                onClickOnComments={onClickOnComments}
                onClickDelete={onClickDelete}
                handleVotePost={handleVotePost}
                posts={posts}
                onClickOnPost={onClickOnPost}
                isMine={isMine}
            /> 
            {isDeleteOpen && (
                <Modal 
                    title="¿Estas seguro de eliminar este post?"
                    description="Esta acción no se puede deshacer"
                    cancelText="Cancelar"
                    deleteText="Eliminar"
                    onCancel={cancelDelete}
                    onProceed={proceedDelete}
                />
            )}                
            </div>
    
    );
}
