import { PostType, type Post } from "../../../../domain";
import { ImageHelper } from "../../../../core";
import noImage from "../../../assets/other/no-image.png";
import Avatar from "../../atoms/avatar/avatar";
import TimeAgo from "../../atoms/time-ago/time-ago";
import VoteButtons from "../../atoms/vote-buttons/vote-buttons";
import style from "./style.module.css";
import LinkifyContent from "../../atoms/linkify-content/linkify-content";
import OptionsDropdown from "../options-dropdown/options-dropdown";
import IconChip from "../../atoms/icon-chip/icon-chip";
import { IconMapper } from "../../../../core/utils/get-icon";
import commentIcon from "../../../assets/icons/comment-grey.svg";
import CommentButton from "../../atoms/comments-button/comments-button";
import shareIcon from "../../../assets/icons/share.svg";


type Props = {
    post: Post;
    onUpVote: () => void;
    onDownVote: () => void;
    onClickOnComments: () => void;
    onClickOnAvatar: () => void; 
    onClickOnPost: () => void;
    onClickDelete?: () => void;
    onClickEdit?: () => void;
    onClickOnShare?: () => void;
    isMine?: boolean;
    isAdminOrMod?: boolean;
    isMenuOpen?: boolean;
    onToggleMenu?: () => void;
    onCloseMenu?: () => void;
    postTypes: PostType[];
}
     
export default function PostItem({
    post, 
    onClickOnAvatar, 
    onUpVote,
    onDownVote, 
    onClickDelete, 
    onClickOnPost, 
    onClickEdit,
    isMine,
    isAdminOrMod,
    isMenuOpen,
    onToggleMenu,
    onCloseMenu,
    postTypes,
    onClickOnComments,
    onClickOnShare
} : Props) {

    return(
        <article className={style.container}>
            <div className={style.headerPost}>
                <Avatar 
                    profile={post.getProfile()} 
                    onClick={onClickOnAvatar} 
                    hideName={true}
                />
                <div className={style.postInfo}>
                    <div className={style.nameRow}>
                        <span className={style.text}>{post.getProfile().displayName}</span>
                        <IconChip 
                            icon={IconMapper.getPostIcon(PostType.mapToName(post.postType?.id, postTypes))} 
                            label={PostType.mapToName(post.postType?.id, postTypes)} 
                        />
                    </div>

                    <TimeAgo createdAt={post.createdAt}/>
                </div>
                 {(isMine || isAdminOrMod) && (
                    <div className={style.menuContainer}>
                        <OptionsDropdown
                            isOpen={isMenuOpen} 
                            onClose={onCloseMenu}
                            onToggle={onToggleMenu}
                            onDelete={onClickDelete} 
                            onEdit={isMine ? onClickEdit : undefined}
                        />
                    </div>
                )}
            </div>
            <div className={style.clickableContent} onClick={onClickOnPost}>
                <span className={style.title}>{post.title}</span>
                <div className={style.postBody}>
                    <LinkifyContent text={post.content} className={style.content}/>
                    {post.imageId && (
                        <img 
                            src={ImageHelper.buildRoute(post.imageId) || noImage} 
                            alt="post image" 
                            className={style.image} 
                            onError={(e) => { e.currentTarget.src = noImage }}
                        />
                    )}
                </div>
            </div>
            <div className={style.section}>
                <VoteButtons upVotes={post.upvotersQuantity} downVotes={post.downvotersQuantity} onUpVote={onUpVote} onDownVote={onDownVote}/>
                <div className={style.actions}>
                    <CommentButton
                        onClick={onClickOnComments}
                        text="Comentar"
                        modifier={style.commentButton}
                        iconSrc={commentIcon}
                    /> 
                    <CommentButton
                        onClick={onClickOnShare}
                        text="Share"
                        modifier={style.commentButton}
                        iconSrc={shareIcon}
                    />
                </div>
            </div>
        </article>
    );
}
