import { PostType, Vote, type Comment, type Post, type Profile } from "../../../../domain";
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
    rootComments: Comment[];
    handleAddComment: (e: React.FormEvent<HTMLFormElement>) => void;
    handleVoteComment: (commentId: string, voteType: Vote) => void;
    onClickOnAvatarComment: (comment: Comment) => void;
    isDeleteOpen: boolean;
    onClickDelete: () => void;
    cancelDelete: () => void;
    proceedDelete: () => void;
    profiles: Profile[];
    onClickEdit?: (postId: string) => void;
    replyTo: string | null;
    onCancelReply?: () => void;  
    getReplies: (parentId: string) => Comment[];
    toggleReplies: (commentId: string) => void;
    isExpanded: (commentId: string) => boolean;
    onReply: (commentId: string) => void;
    isDeleteCommentOpen: boolean;
    onClickDeleteComment: (id: string) => void;
    cancelDeleteComment: () => void;
    proceedDeleteComment: () => void; 
    isMyComment: (comment: Comment) => boolean;
    isAdminOrMod?: boolean;
    activeMenuId?: string | null;
    onToggleMenu?: (postId: string) => void;
    onCloseMenu?: () => void;
    postTypes: PostType[];
    onClickSharePost: () => void;
}

export default function PostDetail({
    post,
    isMine,
    onClickOnPost,
    onClickOnAvatarPost,
    handleVotePost,
    onClickOnComment,
    rootComments,
    handleAddComment,
    handleVoteComment,
    onClickOnAvatarComment,
    isDeleteOpen,
    onClickDelete,
    onClickEdit,
    cancelDelete,
    proceedDelete,
    profiles,
    replyTo,
    getReplies,
    toggleReplies,
    isExpanded,
    onReply,
    isDeleteCommentOpen,
    onClickDeleteComment,
    cancelDeleteComment,
    proceedDeleteComment,
    isMyComment,
    isAdminOrMod,
    activeMenuId,
    onToggleMenu,
    onCloseMenu,
    postTypes,
    onClickSharePost
}: Props)  {

    return(
        <div className={style.container}>
            <PostItem 
                isMine={isMine}
                isAdminOrMod={isAdminOrMod}
                post={post}
                onClickOnPost={onClickOnPost} 
                onClickOnAvatar={onClickOnAvatarPost} 
                onClickOnComments={onClickOnComment} 
                onClickDelete={onClickDelete}
                onClickEdit={onClickEdit ? () => onClickEdit(post.id) : undefined}
                onUpVote={() => handleVotePost(Vote.UPVOTE)}
                onDownVote={() => handleVotePost(Vote.DOWNVOTE)}
                isMenuOpen={activeMenuId === post.id}
                onToggleMenu={onToggleMenu ? () => onToggleMenu(post.id) : undefined}
                onCloseMenu={onCloseMenu}
                postTypes={postTypes}
                onClickOnShare={onClickSharePost}
            />
            <NewComment 
                onAddComment={handleAddComment}
                profiles={profiles}
                replyTo={replyTo}
                placeholderText={"Añadir tu respuesta..."}
                
            />
            <CommentsList 
                isMyComment={isMyComment}
                rootComments={rootComments}
                onClickOnAvatar={onClickOnAvatarComment}
                handleVoteComment={handleVoteComment}
                replyTo={replyTo}
                profiles={profiles}
                handleAddComment={handleAddComment}
                getReplies={getReplies}
                toggleReplies={toggleReplies}
                isExpanded={isExpanded}
                onReply={onReply}
                onClickDeleteComment={onClickDeleteComment}
                isMine={isMine}
                isAdminOrMod={isAdminOrMod}
                onToggleMenu={onToggleMenu}
                activeMenuId={activeMenuId}
                onCloseMenu={onCloseMenu}
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
            {isDeleteCommentOpen && (
                <Modal 
                    title="¿Estas seguro de eliminar este comentario?"description="Esta acción eliminará también las respuestas asociadas."
                    cancelText="Cancelar"
                    deleteText="Eliminar"
                    onCancel={cancelDeleteComment}
                    onProceed={proceedDeleteComment}
                />
            )}
        </div>
    )
}
