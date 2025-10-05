import type { Comment, Post } from "../../../../domain";
import PostItem from "../../molecules/post-item/post-item";
import CommentsList from "../comments-list/comments-list";
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
    handleAddComment: () => void;  
    newComment: string;
    setNewComment: React.Dispatch<React.SetStateAction<string>>;  
}

export default function PostDetail({
    post, onClickOnAvatarPost, onClickOnComment, onDownVotePost, onUpVotePost, isMine, onClickOnPost, 
    comments, onClickOnAvatarComment, onDownVoteComment, onUpVoteComment, onClickOnComments, onClickDelete,
    handleAddComment, newComment, setNewComment
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
                    content={newComment}               
                    onChangeContent={setNewComment}   
                    onAddComment={() => {
                        handleAddComment(); 
                        setNewComment("");                 
                    }}
                />
            </div>
            
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