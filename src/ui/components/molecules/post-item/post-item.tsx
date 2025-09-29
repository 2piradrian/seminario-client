import type { Post, UserProfile } from "../../../../domain";
import { ImageHelper } from "../../../../core";
import noImage from "../../../assets/other/no-image.png";
import LargeTitle from "../../atoms/large-title/large-title";
import UserAvatar from "../../atoms/user-avatar/user-avatar";
import VoteButtons from "../../atoms/vote-buttons/vote-buttons";
import CommentButton from "../../atoms/comments-button/comments-button";
import style from "./style.module.css";


type Props = {
    post: Post;
    profile: UserProfile;
    onUpVote: () => void;
    onDownVote: () => void;
    onClickOnComments: () => void;
}
     
export default function PostItem({post, profile, onUpVote, onDownVote, onClickOnComments} : Props) {

    return(
        <article className={style.container}>
            <UserAvatar name={profile.name} surname={profile.surname} profileImage={profile.profileImage} />
            <div>
                <LargeTitle text={post.title} />
            </div>
            <div>
                <img 
                    src={ImageHelper.buildRoute(post.imageId) || noImage} 
                    alt="post image" 
                    className={style.portrait} 
                    onError={(e) => { e.currentTarget.src = noImage }}
                />
            </div>
            <div>
                <VoteButtons upVotes={post.upvoters} downVotes={post.downvoters} onUpVote={onUpVote} onDownVote={onDownVote}/>
                <CommentButton onClick={onClickOnComments} />
            </div>
        </article>
    )
}