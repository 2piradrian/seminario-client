import type { Post } from "../../../../domain";
import { ImageHelper } from "../../../../core";
import noImage from "../../../assets/other/no-image.png";
import LargeTitle from "../../atoms/large-title/large-title";
import UserAvatar from "../../atoms/user-avatar/user-avatar";
import TimeAgo from "../../atoms/time-ago/time-ago";
import VoteButtons from "../../atoms/vote-buttons/vote-buttons";
import CommentButton from "../../atoms/comments-button/comments-button";
import style from "./style.module.css";

type Props = {
    post: Post;
    onUpVote: () => void;
    onDownVote: () => void;
    onClickOnComments: () => void;
    onAvatarClick: () => void; 
}
     
export default function PostItem({
    post, onAvatarClick, 
    onUpVote, onDownVote, onClickOnComments
} : Props) {

    return(
        <article className={style.container}>
            <UserAvatar 
                name={post.author.name} 
                surname={post.author.surname} 
                profileImage={post.author.profileImage} 
                onClick={onAvatarClick} 
            />
            <TimeAgo createdAt={post.createdAt}/>
            <LargeTitle text={post.title} />
            <img 
                src={ImageHelper.buildRoute(post.imageId) || noImage} 
                alt="post image" 
                className={style.portrait} 
                onError={(e) => { e.currentTarget.src = noImage }}
            />
            <div className={style.section}>
                <VoteButtons upVotes={post.upvoters} downVotes={post.downvoters} onUpVote={onUpVote} onDownVote={onDownVote}/>
                <CommentButton onClick={onClickOnComments} />
            </div>
        </article>
    )
}