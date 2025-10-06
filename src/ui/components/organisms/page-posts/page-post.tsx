import style from "./style.module.css"
import { type Post,  type UserProfile} from "../../../../domain";
import PostsList from "../posts-list/posts-list";
import ProfileDetail from "../user-profile-detail/user-profile-detail";
import Modal from "../../molecules/modal/modal";

type Props = {
    profile: UserProfile
    posts: Post[];
    onUpVote: (postId: string) => void;
    onDownVote: (postId: string) => void;
    onClickOnComments: (postId: string) => void;
    onClickOnAvatar: () => void;
    onClickDelete: (postId : string) => void;
    onClickOnPost: (postId: string) => void;
    isMine: boolean
    isDeleteOpen: boolean
    cancelDelete: () => void
    proceedDelete: () => void
};

export default function PagePosts ({    
    profile,
    posts,
    onClickOnAvatar,
    onClickOnComments,
    onClickDelete,
    onDownVote,
    onUpVote, 
    onClickOnPost, 
    isMine, 
    isDeleteOpen,
    proceedDelete,
    cancelDelete
 } : Props) {

    return(
        <div className={style.container}>
            <div>
                <ProfileDetail 
                    profile={profile}   
                />
            </div>
            <div >
                <PostsList 
                    onClickOnAvatar={onClickOnAvatar}
                    onClickOnComments={onClickOnComments}
                    onClickDelete={onClickDelete}
                    onDownVote={onDownVote}
                    onUpVote={onUpVote}
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

        </div>
    
    );
}