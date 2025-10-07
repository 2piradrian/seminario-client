import { Comment, Vote } from "../../../../domain";
import CommentItem from "../../molecules/comment-item/comment-item";
import style from "./style.module.css";

type Props = {
    comments: Comment[];
    onClickOnAvatar: () => void;
    handleVoteComment: (commentId: string, voteType: Vote) => void;
    onClickOnComments: () => void;
}; 

export default function CommentsList({
    comments, onClickOnAvatar, onClickOnComments,
    handleVoteComment
}: Props) {
    return(
        <section className={style.list}>
            {comments.map((comment) => (
                <CommentItem 
                    key={comment.id}
                    onClickOnComments={onClickOnComments}
                    onClickOnAvatar={() => onClickOnAvatar()}
                    comment={comment}
                    onUpVoteComment={() => handleVoteComment(comment.id, Vote.UPVOTE)}
                    onDownVoteComment={() => handleVoteComment(comment.id, Vote.DOWNVOTE)}
                />
            ))}
        </section>
    );
}