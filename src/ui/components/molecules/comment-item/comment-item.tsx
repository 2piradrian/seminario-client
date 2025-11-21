import { Comment, Profile } from "../../../../domain";
import Avatar from "../../atoms/avatar/avatar";
import VoteButtons from "../../atoms/vote-buttons/vote-buttons";
import TimeAgo from "../../atoms/time-ago/time-ago";
import CommentButton from "../../atoms/comments-button/comments-button";
import style from "./style.module.css"; 
import TextButton from "../../atoms/text-button/text-button";
import NewComment from "../../atoms/new-comment/new-comment";
import DeleteButton from "../../atoms/delete-button/delete-button";

type Props = {
    comment: Comment; 
    onClickOnAvatar: () => void; 
    onUpVoteComment: () => void; 
    onDownVoteComment: () => void; 
    onReply?: (commentId: string) => void;
    onToggleReplies?: () => void; 
    isExpanded?: boolean;
    isReplying?: boolean;
    onAddComment?: (e: React.FormEvent<HTMLFormElement>) => void;
    profiles?: Profile[];
    onClickDeleteComment?: () => void;
    isMine?: boolean;
};

export default function CommentItem({ 
    comment, 
    isMine,
    onClickOnAvatar, 
    onClickDeleteComment, 
    onUpVoteComment, 
    onDownVoteComment, 
    onReply,
    onToggleReplies,
    isExpanded,
    isReplying,
    onAddComment,
    profiles
} : Props) {
    return(
        <div className={style.container}>
            <div className={style.headerComment}>
                <Avatar
                    profile={comment.getProfile()}
                    onClick={onClickOnAvatar} 
                />
                <TimeAgo createdAt={comment.createdAt} />            
            </div>
            {comment.replyTo && (
                <div className={style.replyIndicator}>
                    En respuesta a <span>{comment.author.profile.name}</span>
                </div>
            )}
            <p className={style.contentComment}>{comment.content}</p>
            
            <div className={style.section}>
                <VoteButtons 
                    upVotes={comment.upvotersQuantity} 
                    downVotes={comment.downvotersQuantity} 
                    onUpVote={onUpVoteComment} 
                    onDownVote={onDownVoteComment}
                />
                
                <CommentButton
                    text="Responder"
                    onClick={() => onReply && onReply(comment.id)} 
                />
                {isMine && (
                    <div className={style.actions}>
                        <DeleteButton text="Eliminar" onClick={onClickDeleteComment}/>
                    </div>
                )}

            </div>
                {onToggleReplies && (
                    <div>
                        <TextButton 
                            text={isExpanded ? "Ocultar respuestas" : "Ver respuestas"}
                            onClick={onToggleReplies}
                        />
                    </div>
                )}
            {isReplying && onAddComment && profiles && (
                <div className={style.replyFormWrapper}>
                    <NewComment 
                        onAddComment={onAddComment} 
                        profiles={profiles} 
                        placeholderText={`Respondiendo a ${comment.author.profile.name}...`}
                    />
                </div>
            )}
        </div>
    );
}