import type { Comment } from "../../../../domain";
import UserAvatar from "../../atoms/user-avatar/user-avatar";
import VoteButtons from "../../atoms/vote-buttons/vote-buttons";
import TimeAgo from "../../atoms/time-ago/time-ago";
import style from "./style.module.css"; 

type Props = {
    avatarName: string;
    avatarProfileImage: string;
    onClickOnAvatar: () => void; 
    comment: Comment; 
    onUpVoteComment: () => void; 
    onDownVoteComment: () => void; 
};

export default function CommentItem({
    avatarName, avatarProfileImage, onClickOnAvatar, 
    comment, onUpVoteComment, onDownVoteComment
} : Props) {
    return(
        <div className={style.container}>
            <UserAvatar name={avatarName} profileImage={avatarProfileImage} onClick={onClickOnAvatar} />
            <TimeAgo createdAt={comment.createdAt}/>            
            <p className={style.contentComment} />
            <VoteButtons upVotes={comment.upvoters} downVotes={comment.downvoters} onUpVote={onUpVoteComment} onDownVote={onDownVoteComment}/>
        </div>
    );
}