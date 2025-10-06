import type { Comment, Post, Profile } from "../../../../domain";
import PostItem from "../../molecules/post-item/post-item";
import NewComment from "../../atoms/new-comment/new-comment";
import CommentsList from "../comments-list/comments-list";
import style from "./style.module.css"; 
import Modal from "../../molecules/modal/modal";

type Props = {
    post: Post;
    onClickOnAvatarPost: () => void; 
    onClickOnComment: () => void;
    onDownVotePost: () => void;
    onUpVotePost: () => void; 
    comments: Comment[];
    onClickOnAvatarComment: () => void;
    onDownVoteComment: () => void;
    onUpVoteComment: () => void; 
    onClickOnComments: () => void;
    onClickDelete: () => void;
    onClickOnPost: () => void;
    isMine: boolean;
    handleAddComment: (e: React.FormEvent<HTMLFormElement>) => void;  
    profiles: Profile[];
    cancelDelete: () => void;
    proceedDelete: () => void;
    isDeleteOpen: boolean;
}

export default function PostDetail({
    post, onClickOnAvatarPost, onClickOnComment, onDownVotePost, onUpVotePost, 
    isMine, onClickOnPost, onClickDelete, handleAddComment,
    cancelDelete, proceedDelete, isDeleteOpen,
    profiles, onClickOnAvatarComment, onClickOnComments, onDownVoteComment, onUpVoteComment, comments
}: Props )  {
    return(
        <div className={style.container}>
            <div className={style.postSection}>
                <PostItem 
                    isMine={isMine}
                    onClickOnPost={onClickOnPost}
                    post={post} 
                    onClickOnAvatar={onClickOnAvatarPost} 
                    onClickOnComments={onClickOnComment} 
                    onClickDelete={onClickDelete}
                    onDownVote={onDownVotePost} 
                    onUpVote={onUpVotePost} 
                />
            </div> 
            <div className={style.newCommentSection}>
                <NewComment 
                    onAddComment={handleAddComment}
                    profiles={profiles}
                />
            </div>
            <div className={style.commentsSection}>
                <CommentsList 
                    onClickOnComments={onClickOnComments}
                    comments={comments}
                    onClickOnAvatar={onClickOnAvatarComment}
                    onDownVote={onDownVoteComment}
                    onUpVote={onUpVoteComment}
                /> 
            </div>

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
    )
}