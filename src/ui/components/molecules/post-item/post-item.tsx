import { Profile, type Post } from "../../../../domain";
import { ImageHelper } from "../../../../core";
import noImage from "../../../assets/other/no-image.png";
import LargeTitle from "../../atoms/large-title/large-title";
import Avatar from "../../atoms/avatar/avatar";
import TimeAgo from "../../atoms/time-ago/time-ago";
import VoteButtons from "../../atoms/vote-buttons/vote-buttons";
import style from "./style.module.css";
import LinkifyContent from "../../atoms/linkify-content/linkify-content";
import OptionsDropdown from "../options-dropdown/options-dropdown";

type Props = {
    post: Post;
    onUpVote: () => void;
    onDownVote: () => void;
    onClickOnComments: () => void;
    onClickOnAvatar: () => void; 
    onClickOnPost: () => void;
    onClickDelete?: () => void;
    onClickEdit?: () => void;
    isMine?: boolean;
    isAdminOrMod?: boolean;
    isMenuOpen?: boolean;
    onToggleMenu?: () => void;
    onCloseMenu?: () => void;
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
    onCloseMenu
} : Props) {

    return(
        <article className={style.container}>
            <div className={style.headerPost}>
                <Avatar 
                    profile={post.getProfile()} 
                    onClick={onClickOnAvatar} 
                />
                <TimeAgo createdAt={post.createdAt}/>
                 {(isMine || isAdminOrMod) && (
                    <div className={style.menuContainer}>
                        <OptionsDropdown
                            isOpen={isMenuOpen} 
                            onClose={onCloseMenu}
                            onToggle={onToggleMenu}
                            onDelete={onClickDelete} 
                            onEdit={onClickEdit}
                        />
                    </div>
                )}
            </div>
            <div className={style.clickableContent} onClick={onClickOnPost}>
                <LargeTitle text={post.title} />
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
                <div className={style.actions}>
                    <VoteButtons upVotes={post.upvotersQuantity} downVotes={post.downvotersQuantity} onUpVote={onUpVote} onDownVote={onDownVote}/>
                </div>

            </div>
        </article>
    );
}
