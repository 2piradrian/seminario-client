import { Comment, Vote, Profile } from "../../../../domain";
import CommentItem from "../../molecules/comment-item/comment-item";
import style from "./style.module.css";
import ReplyList from "../replies-list/replies-list";

type Props = {
  rootComments: Comment[];
  handleVoteComment: (commentId: string, voteType: Vote) => void;
  onClickOnAvatar: (comment: Comment) => void;
  onReply: (commentId: string) => void;
  replyTo: string | null;
  profiles: Profile[];
  handleAddComment: (e: React.FormEvent<HTMLFormElement>) => void;
  getReplies: (parentId: string) => Comment[];
  toggleReplies: (commentId: string) => void;
  isExpanded: (commentId: string) => boolean;
};

export default function CommentsList({
  rootComments,
  handleVoteComment,
  onClickOnAvatar,
  onReply,
  replyTo,
  profiles,
  handleAddComment,
  getReplies,
  toggleReplies,
  isExpanded
}: Props) {
  return (
    <section className={style.list}>
      {rootComments.map((rootComment) => (
        <div key={rootComment.id}>
          <CommentItem
            comment={rootComment}
            onClickOnAvatar={() => onClickOnAvatar(rootComment)}
            onUpVoteComment={() => handleVoteComment(rootComment.id, Vote.UPVOTE)}
            onDownVoteComment={() => handleVoteComment(rootComment.id, Vote.DOWNVOTE)}
            onReply={onReply}
            onToggleReplies={() => toggleReplies(rootComment.id)}
            isExpanded={isExpanded(rootComment.id)}
            isReplying={replyTo === rootComment.id}
            onAddComment={handleAddComment}
            profiles={profiles}
          />

            {isExpanded(rootComment.id) && (
                <div className={style.repliesWrapper}>
                     <ReplyList 
                        replies={getReplies(rootComment.id)} 
                        handleVoteComment={handleVoteComment}
                        onClickOnAvatar={onClickOnAvatar}
                        onReply={onReply}
                     />
                </div>
            )}

        </div>
      ))}
    </section>
  );
}
