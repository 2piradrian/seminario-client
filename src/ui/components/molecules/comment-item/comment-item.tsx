import { Profile, type Comment } from "../../../../domain";
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
    onClickOnComments: () => void;
};

export default function CommentItem({ 
    comment, 
    onClickOnAvatar, 
    onUpVoteComment, 
    onDownVoteComment, 
    onClickOnComments
} : Props) {
    return(
        <div className={style.container}>
            <div className={style.headerComment}>
                <Avatar
                    profile={Profile.fromEntity(comment.author, comment.page)}
                    onClick={onClickOnAvatar} 
                />
                <TimeAgo createdAt={comment.createdAt} />            
            </div>
            <p className={style.contentComment}>{comment.content}</p>
            <div className={style.section}>
                <VoteButtons upVotes={comment.upvotersSize} downVotes={comment.downvotersSize} onUpVote={onUpVoteComment} onDownVote={onDownVoteComment}/>
                <CommentButton text="Responder" onClick={onClickOnComments} />
            </div>
        </div>
    );
}