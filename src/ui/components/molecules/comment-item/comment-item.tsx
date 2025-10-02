import { Profile, type Comment } from "../../../../domain";
import UserAvatar from "../../atoms/avatar/avatar";
import VoteButtons from "../../atoms/vote-buttons/vote-buttons";
import TimeAgo from "../../atoms/time-ago/time-ago";
import style from "./style.module.css"; 

type Props = {
    onClickOnAvatar: () => void; 
    comment: Comment; 
    onUpVoteComment: () => void; 
    onDownVoteComment: () => void; 
};

export default function CommentItem({ 
    onClickOnAvatar, 
    comment, onUpVoteComment, onDownVoteComment
} : Props) {
    return(
        <div className={style.container}>
            <UserAvatar
                profile={Profile.fromEntity(comment.page ? comment.page : comment.author)}
                onClick={onClickOnAvatar} 
            />
            <TimeAgo createdAt={comment.createdAt} />            
            <p className={style.contentComment} />
            <VoteButtons upVotes={comment.upvoters} downVotes={comment.downvoters} onUpVote={onUpVoteComment} onDownVote={onDownVoteComment}/>
        </div>
    );
}