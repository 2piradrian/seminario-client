import type { Comment, Post } from "../../../../domain";
import PostItem from "../../molecules/post-item/post-item";
import NewComment from "../../atoms/new-comment/new-comment";
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
}

export default function PostDetail({
    post, onClickOnAvatarPost, onClickOnComment, onDownVotePost, onUpVotePost, 
    isMine, onClickOnPost, onClickDelete, handleAddComment
}: Props )  {
    return(
        <div className={style.container}>
            <div className={style.post}>
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
            <div className={style.newComment}>
                <NewComment 
                    onAddComment={handleAddComment}
                    
                />
            </div>
            
            {/* <CommentsList 
                onClickOnComments={onClickOnComments}
                comments={comments}
                onClickOnAvatar={onClickOnAvatarComment}
                onDownVote={onDownVoteComment}
                onUpVote={onUpVoteComment}
            /> */}
        </div>
    )
}