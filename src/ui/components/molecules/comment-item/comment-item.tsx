import { Comment, Profile } from "../../../../domain";
import Avatar from "../../atoms/avatar/avatar";
import VoteButtons from "../../atoms/vote-buttons/vote-buttons";
import TimeAgo from "../../atoms/time-ago/time-ago";
import CommentButton from "../../atoms/comments-button/comments-button";
import style from "./style.module.css"; 
import TextButton from "../../atoms/text-button/text-button";
import NewComment from "../../atoms/new-comment/new-comment";
import commentIcon from "../../../assets/icons/comment-grey.svg";
import OptionsDropdown from "../options-dropdown/options-dropdown";

type Props = {
    comment: Comment; 
    onClickOnAvatar: () => void; 
    onUpVoteComment: () => void; 
    onDownVoteComment: () => void; 
    onReply?: (commentId: string) => void;
    onToggleReplies?: () => void; 
    isExpanded?: boolean;
    isReplying?: boolean;
    onAddComment?: (e: React.FormEvent<HTMLFormElement>) => void;
    profiles?: Profile[];
    onClickDeleteComment?: () => void;
    canDelete?: boolean;
    rootCommentAuthor?: Profile;
    isMenuOpen?: boolean;
    onToggleMenu?: () => void;
    onCloseMenu?: () => void;
};

export default function CommentItem({ 
    comment, 
    onClickOnAvatar, 
    onUpVoteComment, 
    onDownVoteComment, 
    onReply,
    onToggleReplies,
    isExpanded,
    isReplying,
    onAddComment,
    profiles,
    rootCommentAuthor,
    onClickDeleteComment,
    canDelete,
    isMenuOpen,
    onToggleMenu,
    onCloseMenu
} : Props) {
    return(
        <div className={style.container}>
            <div className={style.headerComment}>
                <Avatar
                    profile={comment.getProfile()}
                    onClick={onClickOnAvatar}
                    hideName={true}

                />
                <div className={style.commentInfo}>
                    <span className={style.text}>{ comment.getProfile().displayName}</span>
                    <TimeAgo createdAt={comment.createdAt}/>
                </div>
                {canDelete && onClickDeleteComment && (
                    <div className={style.optionsWrapper}> 
                        <OptionsDropdown 
                            isOpen={isMenuOpen} 
                            onClose={onCloseMenu}
                            onToggle={onToggleMenu}
                            onDelete={onClickDeleteComment} 
                        />
                    </div>
                )}
            </div>
            {comment.replyTo && (
                <div className={style.replyIndicator}>
                    En respuesta a <span>{rootCommentAuthor.displayName}</span>
                </div>
            )}
            <p className={style.contentComment}>{comment.content}</p>
            
            <div className={style.section}>
                <VoteButtons 
                    upVotes={comment.upvotersQuantity} 
                    downVotes={comment.downvotersQuantity} 
                    onUpVote={onUpVoteComment} 
                    onDownVote={onDownVoteComment}
                />
                
                {!comment.replyTo && (
                    <CommentButton
                        onClick={() => onReply && onReply(comment.id)}
                        text="Responder"
                        modifier={style.commentButton}
                        iconSrc={commentIcon}
                    /> 
                )}

            </div>
                {onToggleReplies && (
                    <div>
                        <TextButton 
                            text={isExpanded ? "Ocultar respuestas" : "Ver respuestas"}
                            onClick={onToggleReplies}
                        />
                    </div>
                )}
            {isReplying && onAddComment && profiles && (
                <div className={style.replyFormWrapper}>
                    <NewComment 
                        onAddComment={onAddComment} 
                        profiles={profiles} 
                        placeholderText={`Respondiendo a ${comment.author.profile.name}...`}
                    />
                </div>
            )}
        </div>
    );
}