import type { Comment } from "../../../../domain";
import CommentItem from "../../molecules/comment-item/comment-item";
import style from "./style.module.css";

type Props = {
  comments: Comment[];
  avatarName: string;
  avatarProfileImage: string;
  onClickOnAvatar: (id: string) => void;
  onUpVoteComment: (id: string) => void;
  onDownVoteComment: (id: string) => void;
}; 

export default function CommentsList({comments, avatarName, avatarProfileImage, onClickOnAvatar, 
    onUpVoteComment, onDownVoteComment} :  Props) {
        return(
            <section className={style.list}>
                {comments.map((comment) => (
                    <CommentItem 
                        avatarName={avatarName} 
                        avatarProfileImage={avatarProfileImage}
                        onClickOnAvatar={() => onClickOnAvatar(comment.id)}
                        comment={comment}
                        onUpVoteComment={() => onUpVoteComment(comment.id)}
                        onDownVoteComment={() => onDownVoteComment(comment.id)}
                    />
                ))}
            </section>
        );
}