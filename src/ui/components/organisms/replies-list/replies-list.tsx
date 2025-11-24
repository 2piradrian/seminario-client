import CommentItem from "../../molecules/comment-item/comment-item";
import { Comment, Vote } from "../../../../domain";
import style from "./style.module.css";

type Props = {
  replies: Comment[];
  isMine?: boolean;
  handleVoteComment: (commentId: string, voteType: Vote) => void;
  onClickOnAvatar: (comment: Comment) => void;
  onReply: (commentId: string) => void;
  onClickDeleteComment?: (commentId: string) => void;
  isMyComment: (comment: Comment) => boolean;

};

export default function ReplyList({
  replies,
  handleVoteComment,
  onClickOnAvatar,
  onReply,
  onClickDeleteComment,
  isMyComment
}: Props) {

  return (
    <>
      {replies.length === 0 ? (
        <span className={style.noResults}>No hay respuestas aún.</span>
      ) : (
        <div className={style.replyListContainer}>
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onClickDeleteComment={() => onClickDeleteComment(reply.id)}
              onClickOnAvatar={() => onClickOnAvatar(reply)}
              onUpVoteComment={() => handleVoteComment(reply.id, Vote.UPVOTE)}
              onDownVoteComment={() => handleVoteComment(reply.id, Vote.DOWNVOTE)}
              onReply={onReply}
              isMine={isMyComment(reply)}
              />
          ))}
        </div>
      )}
    </>
  );
}