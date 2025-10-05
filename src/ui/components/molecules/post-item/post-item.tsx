import { Profile, type Post } from "../../../../domain";
import { ImageHelper } from "../../../../core";
import noImage from "../../../assets/other/no-image.png";
import LargeTitle from "../../atoms/large-title/large-title";
import Avatar from "../../atoms/avatar/avatar";
import TimeAgo from "../../atoms/time-ago/time-ago";
import VoteButtons from "../../atoms/vote-buttons/vote-buttons";
import CommentButton from "../../atoms/comments-button/comments-button";
import style from "./style.module.css";
import DeleteButton from "../../atoms/delete-button/delete-button";

type Props = {
    post: Post;
    onUpVote: () => void;
    onDownVote: () => void;
    onClickOnComments: () => void;
    onClickOnAvatar: () => void; 
    onClickDelete: () => void;
}
     
export default function PostItem({
    post, onClickOnAvatar, 
    onUpVote, onDownVote, onClickOnComments, onClickDelete
} : Props) {

    return(
        <article className={style.container}>
            <div className={style.headerPost}>
                <Avatar 
                    profile={Profile.fromEntity(post.page?.id ? post.page : post.author)} 
                    onClick={onClickOnAvatar} 
                />
                <TimeAgo createdAt={post.createdAt}/>
            </div>
            <LargeTitle text={post.title} />
            {post.imageId && (
                <img 
                    src={ImageHelper.buildRoute(post.imageId) || noImage} 
                    alt="post image" 
                    className={style.portrait} 
                    onError={(e) => { e.currentTarget.src = noImage }}
                />
            )}

            <p className={style.content}>{post.content}</p>
            <div className={style.section}>
                <div className={style.actions}>
                    <VoteButtons upVotes={post.upvoters} downVotes={post.downvoters} onUpVote={onUpVote} onDownVote={onDownVote}/>
                    <CommentButton text="Comentar" onClick={onClickOnComments} />
                </div>
                <div>
                    <DeleteButton text="Comentar" onClick={onClickDelete}/>
                </div>
             
            </div>
        </article>
    )
}