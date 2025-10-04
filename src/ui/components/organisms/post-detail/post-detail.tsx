import type { Comment, Post } from "../../../../domain";
import PostItem from "../../molecules/post-item/post-item";
import CommentsList from "../comments-list/comments-list";
import style from "./style.module.css"; 

type Props = {
    post: Post;
    onClickOnAvatarPost: () => void; 
    onClickOnComment: () => void;
    onDownVotePost: () => void;
    onUpVotePost: () => void; 
    comments: Comment[];
    onClickOnAvatarComment: () => void;
    onDownVoteComment: () => void;
    onUpVoteComment: () => void; 
    onClickOnComments: () => void;
}

export default function PostDetail({
    post, onClickOnAvatarPost, onClickOnComment, onDownVotePost, onUpVotePost, 
    comments, onClickOnAvatarComment, onDownVoteComment, onUpVoteComment, onClickOnComments
}: Props )  {
    return(
        <div className={style.container}>
            <PostItem 
                post={post} 
                onClickOnAvatar={onClickOnAvatarPost} 
                onClickOnComments={onClickOnComment} 
                onDownVote={onDownVotePost} 
                onUpVote={onUpVotePost} 
            /> 
            <CommentsList 
                onClickOnComments={onClickOnComments}
                comments={comments}
                onClickOnAvatar={onClickOnAvatarComment}
                onDownVote={onDownVoteComment}
                onUpVote={onUpVoteComment}
            />
        </div>
    )
}