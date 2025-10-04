import type { Comment } from "../../../../domain";
import CommentItem from "../../molecules/comment-item/comment-item";
import style from "./style.module.css";

type Props = {
    comments: Comment[];
    onClickOnAvatar: (id: string) => void;
    onUpVote: (id: string) => void;
    onDownVote: (id: string) => void;
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
                    onClickOnAvatar={() => onClickOnAvatar(comment.id)}
                    comment={comment}
                    onUpVoteComment={() => onUpVote(comment.id)}
                    onDownVoteComment={() => onDownVote(comment.id)}
                />
            ))}
        </section>
    );
}