import { Vote, type Comment, type Post, type Profile } from "../../../../domain";
import PostItem from "../../molecules/post-item/post-item";
import NewComment from "../../atoms/new-comment/new-comment";
import CommentsList from "../comments-list/comments-list";
import Modal from "../../molecules/modal/modal";
import style from "./style.module.css"; 

type Props = {
    post: Post;
    isMine: boolean;
    onClickOnPost: () => void;
    onClickOnAvatarPost: () => void;
    handleVotePost: (voteType: Vote) => Promise<void>;
    onClickOnComment: () => void;
    comments: Comment[];
    handleAddComment: (e: React.FormEvent<HTMLFormElement>) => void;
    handleVoteComment: (commentId: string, voteType: Vote) => void;
    onClickOnAvatarComment: (comment: Comment) => void;
    isDeleteOpen: boolean;
    onClickDelete: () => void;
    cancelDelete: () => void;
    proceedDelete: () => void;
    profiles: Profile[];
    onClickEdit?: () => void;
}

export default function PostDetail({
    post,
    isMine,
    onClickOnPost,
    onClickOnAvatarPost,
    handleVotePost,
    onClickOnComment,
    comments,
    handleAddComment,
    handleVoteComment,
    onClickOnAvatarComment,
    isDeleteOpen,
    onClickDelete,
    onClickEdit,
    cancelDelete,
    proceedDelete,
    profiles
}: Props)  {
    return(
        <div className={style.container}>
            <PostItem 
                isMine={isMine}
                post={post}
                onClickOnPost={onClickOnPost} 
                onClickOnAvatar={onClickOnAvatarPost} 
                onClickOnComments={onClickOnComment} 
                onClickDelete={onClickDelete}
                onClickEdit={onClickEdit}
                onUpVote={() => handleVotePost(Vote.UPVOTE)}
                onDownVote={() => handleVotePost(Vote.DOWNVOTE)}
            />
            <NewComment 
                onAddComment={handleAddComment}
                profiles={profiles}
            />
            <CommentsList 
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
