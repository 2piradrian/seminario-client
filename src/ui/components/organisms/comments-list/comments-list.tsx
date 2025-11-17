import { Comment, Vote, Profile } from "../../../../domain";
import CommentItem from "../../molecules/comment-item/comment-item";
import NewComment from "../../atoms/new-comment/new-comment";
import style from "./style.module.css";

type Props = {
  comments: Comment[];
  handleVoteComment: (commentId: string, voteType: Vote) => void;
  onClickOnAvatar: (comment: Comment) => void;
  onReply: (commentId: string) => void;
  replyTo: string | null;
  profiles: Profile[];
  handleAddComment: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function CommentsList({
  comments,
  handleVoteComment,
  onClickOnAvatar,
  onReply,
  replyTo,
  profiles,
  handleAddComment
}: Props) {
  return (
    <section className={style.list}>
      {comments.map((comment) => (
        <div key={comment.id}>
          <CommentItem
            comment={comment}
            onClickOnAvatar={() => onClickOnAvatar(comment)}
            onUpVoteComment={() => handleVoteComment(comment.id, Vote.UPVOTE)}
            onDownVoteComment={() => handleVoteComment(comment.id, Vote.DOWNVOTE)}
            onReply={onReply}
          />
          {replyTo === comment.id && (
            <div className={style.replyForm}>
              <NewComment onAddComment={handleAddComment} profiles={profiles} />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
