import { Comment, Vote } from "../../../../domain";
import CommentItem from "../../molecules/comment-item/comment-item";
import style from "./style.module.css";

type Props = {
    comments: Comment[];
    handleVoteComment: (commentId: string, voteType: Vote) => void;
    onClickOnAvatar: (comment: Comment) => void;
};

export default function CommentsList({
    comments,
    handleVoteComment,
    onClickOnAvatar
}: Props) {
    return(
        <section className={style.list}>
            {comments.map((comment) => (
                <CommentItem 
                    key={comment.id}
                    onClickOnAvatar={() => onClickOnAvatar(comment)}
                    comment={comment}
                    onUpVoteComment={() => handleVoteComment(comment.id, Vote.UPVOTE)}
                    onDownVoteComment={() => handleVoteComment(comment.id, Vote.DOWNVOTE)}
                />
            ))}
        </section>
    );
}
