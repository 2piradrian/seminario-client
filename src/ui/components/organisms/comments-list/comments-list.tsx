import type { Comment } from "../../../../domain";
import CommentItem from "../../molecules/comment-item/comment-item";
import style from "./style.module.css";

type Props = {
  comments: Comment[];
  onClickOnAvatar: (id: string) => void;
  onUpVoteComment: (id: string) => void;
  onDownVoteComment: (id: string) => void;
}; 

export default function CommentsList({comments, onClickOnAvatar, 
    onUpVoteComment, onDownVoteComment} :  Props) {
        return(
            <section className={style.list}>
                {comments.map((comment) => (
                    <CommentItem 
                        onClickOnAvatar={() => onClickOnAvatar(comment.id)}
                        comment={comment}
                        onUpVoteComment={() => onUpVoteComment(comment.id)}
                        onDownVoteComment={() => onDownVoteComment(comment.id)}
                    />
                ))}
            </section>
        );
}