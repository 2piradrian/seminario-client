import { Vote, type Comment, type Post, type Profile } from "../../../../domain";
import PostItem from "../../molecules/post-item/post-item";
import NewComment from "../../atoms/new-comment/new-comment";
import CommentsList from "../comments-list/comments-list";
import Modal from "../../molecules/modal/modal";
import style from "./style.module.css"; 

type Props = {
    post: Post;
    onClickOnAvatarPost: () => void; 
    onClickOnComment: () => void;
    handleVotePost: (voteType: Vote) => Promise<void>
    comments: Comment[];
    onClickOnAvatarComment: (comment: Comment) => void;
    handleVoteComment: (commentId: string, voteType: Vote) => void;
    onClickOnComments: () => void;
    onClickDelete: () => void;
    isMine: boolean;
    handleAddComment: (e: React.FormEvent<HTMLFormElement>) => void;  
    profiles: Profile[];
    cancelDelete: () => void;
    proceedDelete: () => void;
    isDeleteOpen: boolean;
    onClickOnPost: () => void;
    
}

export default function PostDetail({
    post, onClickOnAvatarPost, onClickOnComment, handleVotePost, 
    isMine, onClickOnPost, onClickDelete, handleAddComment,
    cancelDelete, proceedDelete, isDeleteOpen,
    profiles, onClickOnAvatarComment, onClickOnComments, handleVoteComment, comments
}: Props)  {
    return(
        <div className={style.container}>
            <div className={style.postSection}>
                <PostItem 
                    isMine={isMine}
                    post={post}
                    onClickOnPost={onClickOnPost} 
                    onClickOnAvatar={onClickOnAvatarPost} 
                    onClickOnComments={onClickOnComment} 
                    onClickDelete={onClickDelete}
                    onUpVote={() => handleVotePost(Vote.UPVOTE)}
                    onDownVote={() => handleVotePost(Vote.DOWNVOTE)}
                />
            </div> 
            <NewComment 
                onAddComment={handleAddComment}
                profiles={profiles}
            />
            <CommentsList 
                onClickOnComments={onClickOnComments}
                comments={comments}
                onClickOnAvatar={onClickOnAvatarComment}
                handleVoteComment={handleVoteComment}
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
    )
}