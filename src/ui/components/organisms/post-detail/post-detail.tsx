import type { Comment, Post, Profile } from "../../../../domain";
import PostItem from "../../molecules/post-item/post-item";
import NewComment from "../../atoms/new-comment/new-comment";
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
    onClickDelete: () => void;
    onClickOnPost: () => void;
    isMine: boolean;
    handleAddComment: (e: React.FormEvent<HTMLFormElement>) => void;  
    profiles: Profile[];
}

export default function PostDetail({
    isMine, onClickOnPost, onClickDelete, handleAddComment,
    post, onClickOnAvatarPost, onClickOnComment, onDownVotePost, onUpVotePost, 
    profiles, onClickOnAvatarComment, onClickOnComments, onDownVoteComment, onUpVoteComment, comments
}: Props )  {
    return(
        <div className={style.container}>
            <div className={style.postSection}>
                <PostItem 
                    isMine={isMine}
                    onClickOnPost={onClickOnPost}
                    post={post} 
                    onClickOnAvatar={onClickOnAvatarPost} 
                    onClickOnComments={onClickOnComment} 
                    onClickDelete={onClickDelete}
                    onDownVote={onDownVotePost} 
                    onUpVote={onUpVotePost} 
                />
            </div> 
            <div className={style.newCommentSection}>
                <NewComment 
                    onAddComment={handleAddComment}
                    profiles={profiles}
                />
            </div>
            <div className={style.commentsSection}>
                <CommentsList 
                    onClickOnComments={onClickOnComments}
                    comments={comments}
                    onClickOnAvatar={onClickOnAvatarComment}
                    onDownVote={onDownVoteComment}
                    onUpVote={onUpVoteComment}
                /> 
            </div>
        </div>
    )
}