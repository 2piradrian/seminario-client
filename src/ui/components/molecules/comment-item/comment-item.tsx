import { type Comment } from "../../../../domain";
import Avatar from "../../atoms/avatar/avatar";
import VoteButtons from "../../atoms/vote-buttons/vote-buttons";
import TimeAgo from "../../atoms/time-ago/time-ago";
import CommentButton from "../../atoms/comments-button/comments-button";
import style from "./style.module.css"; 

type Props = {
    comment: Comment; 
    onClickOnAvatar: () => void; 
    onUpVoteComment: () => void; 
    onDownVoteComment: () => void; 
    onReply: (commentId: string) => void;
};

export default function CommentItem({ 
    comment, 
    onClickOnAvatar, 
    onUpVoteComment, 
    onDownVoteComment, 
    onReply
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
                <VoteButtons upVotes={comment.upvotersQuantity} downVotes={comment.downvotersQuantity} onUpVote={onUpVoteComment} onDownVote={onDownVoteComment}/>
                <CommentButton
                    text="Responder"
                    onClick={() => onReply(comment.id)} 
                />
            </div>
        </div>
    );
}