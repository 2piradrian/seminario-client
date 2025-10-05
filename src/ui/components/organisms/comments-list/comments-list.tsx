import type { Comment } from "../../../../domain";
import CommentItem from "../../molecules/comment-item/comment-item";
import style from "./style.module.css";

type Props = {
    comments: Comment[];
    onClickOnAvatar: () => void;
    onUpVote: () => void;
    onDownVote: () => void;
    onClickOnComments: () => void;
}; 

export default function CommentsList({
    comments, onClickOnAvatar, onClickOnComments,
    onUpVote, onDownVote
}: Props) {
    return(
        <section className={style.list}>
            {comments.map((comment) => (
                <CommentItem 
                    onClickOnComments={onClickOnComments}
                    onClickOnAvatar={() => onClickOnAvatar()}
                    comment={comment}
                    onUpVoteComment={() => onUpVote()}
                    onDownVoteComment={() => onDownVote()}
                />
            ))}
        </section>
    );
}