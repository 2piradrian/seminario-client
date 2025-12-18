import { Comment, Vote, Profile } from "../../../../domain";
import CommentItem from "../../molecules/comment-item/comment-item";
import style from "./style.module.css";
import ReplyList from "../replies-list/replies-list";

type Props = {
  rootComments: Comment[];
  isMine?: boolean;
  handleVoteComment: (commentId: string, voteType: Vote) => void;
  onClickOnAvatar: (comment: Comment) => void;
  onReply: (commentId: string) => void;
  replyTo: string | null;
  profiles: Profile[];
  handleAddComment: (e: React.FormEvent<HTMLFormElement>) => void;
  getReplies: (parentId: string) => Comment[];
  toggleReplies: (commentId: string) => void;
  isExpanded: (commentId: string) => boolean;
  onClickDeleteComment?: (commentId: string) => void;
  isMyComment: (comment: Comment) => boolean;
  isAdminOrMod?: boolean;
  activeMenuId?: string | null;
  onToggleMenu?: (commentId: string) => void;
  onCloseMenu?: () => void;

};

export default function CommentsList({
  rootComments,
  isMine,
  handleVoteComment,
  onClickOnAvatar,
  onClickDeleteComment,
  onReply,
  replyTo,
  profiles,
  handleAddComment,
  getReplies,
  toggleReplies,
  isExpanded,
  isMyComment,
  isAdminOrMod,
  activeMenuId,
  onToggleMenu,
  onCloseMenu,
}: Props) {
  return (
    <section className={style.list}>
      {rootComments.map((rootComment) => (
        <div key={rootComment.id}>
          <CommentItem
            comment={rootComment}
            onClickOnAvatar={() => onClickOnAvatar(rootComment)}
            onClickDeleteComment={() => onClickDeleteComment(rootComment.id)}
            onUpVoteComment={() => handleVoteComment(rootComment.id, Vote.UPVOTE)}
            onDownVoteComment={() => handleVoteComment(rootComment.id, Vote.DOWNVOTE)}
            onReply={onReply}
            onToggleReplies={() => toggleReplies(rootComment.id)}
            isExpanded={isExpanded(rootComment.id)}
            isReplying={replyTo === rootComment.id}
            onAddComment={handleAddComment}
            profiles={profiles}
            canDelete={isMine || isMyComment(rootComment)|| isAdminOrMod}
            isMenuOpen={activeMenuId === rootComment.id}
            onToggleMenu={onToggleMenu ? () => onToggleMenu(rootComment.id) : undefined}
            onCloseMenu={onCloseMenu}
          />

            {isExpanded(rootComment.id) && (
                <div className={style.repliesWrapper}>
                     <ReplyList 
                        rootCommentAuthor={rootComment.author.toProfile()}
                        replies={getReplies(rootComment.id)} 
                        isMine={isMine}
                        isMyComment={isMyComment}
                        isAdminOrMod={isAdminOrMod}
                        onClickDeleteComment={onClickDeleteComment}
                        handleVoteComment={handleVoteComment}
                        onClickOnAvatar={onClickOnAvatar}
                        onReply={onReply}
                        activeMenuId={activeMenuId}
                        onToggleMenu={onToggleMenu}
                        onCloseMenu={onCloseMenu}
                        
                     />
                </div>
            )}

        </div>
      ))}
    </section>
  );
}
