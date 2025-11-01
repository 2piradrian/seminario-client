import { Profile, type Post } from "../../../../domain";
import { ImageHelper } from "../../../../core";
import noImage from "../../../assets/other/no-image.png";
import LargeTitle from "../../atoms/large-title/large-title";
import Avatar from "../../atoms/avatar/avatar";
import TimeAgo from "../../atoms/time-ago/time-ago";
import VoteButtons from "../../atoms/vote-buttons/vote-buttons";
import DeleteButton from "../../atoms/delete-button/delete-button";
import EditButton from "../../atoms/edit-button/edit-button";
import style from "./style.module.css";

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
}
     
export default function PostItem({
    post, 
    onClickOnAvatar, 
    onUpVote,
    onDownVote, 
    onClickDelete, 
    onClickOnPost, 
    onClickEdit,
    isMine
} : Props) {

    return(
        <article className={style.container}>
            <div className={style.headerPost}>
                <Avatar 
                    profile={Profile.fromEntity(post.author, post.pageProfile)} 
                    onClick={onClickOnAvatar} 
                />
                <TimeAgo createdAt={post.createdAt}/>
            </div>
            <div className={style.clickableContent} onClick={onClickOnPost}>
                <LargeTitle text={post.title} />
                <div className={style.postBody}>
                    <p className={style.content}>{post.content}</p>
                    {post.imageId && (
                        <img 
                            src={ImageHelper.buildRoute(post.imageId) || noImage} 
                            alt="post image" 
                            className={style.portrait} 
                            onError={(e) => { e.currentTarget.src = noImage }}
                        />
                    )}
                </div>
            </div>
            <div className={style.section}>
                <div className={style.actions}>
                    <VoteButtons upVotes={post.upvotersQuantity} downVotes={post.downvotersQuantity} onUpVote={onUpVote} onDownVote={onDownVote}/>
                </div>
                {isMine && (
                    <div className={style.actions}>
                        <EditButton text="Editar" onClick={onClickEdit} />
                        <DeleteButton text="Eliminar" onClick={onClickDelete}/>
                    </div>
                )}
            </div>
        </article>
    );
}
