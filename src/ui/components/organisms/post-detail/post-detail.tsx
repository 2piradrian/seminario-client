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
<<<<<<< Updated upstream
    onClickOnPost: () => void;
    isMine: boolean;
    handleAddComment: () => void;  
    newComment: string;
    setNewComment: React.Dispatch<React.SetStateAction<string>>;  
=======
    handleAddComment: () => void;
    newComment: string;
    setNewComment: React.Dispatch<React.SetStateAction<string>>; 
>>>>>>> Stashed changes
}

export default function PostDetail({
    post, onClickOnAvatarPost, onClickOnComment, onDownVotePost, onUpVotePost, 
<<<<<<< Updated upstream
    comments, onClickOnAvatarComment, onDownVoteComment, onUpVoteComment,
    onClickOnComments, onClickDelete, isMine, onClickOnPost,
=======
    comments, onClickOnAvatarComment, onDownVoteComment, onUpVoteComment, onClickOnComments, onClickDelete,
>>>>>>> Stashed changes
    handleAddComment, newComment, setNewComment
}: Props )  {
    return(
        <div className={style.container}>
            <div className={style.post}>
                <PostItem 
                    post={post} 
                    onClickOnAvatar={onClickOnAvatarPost} 
                    onClickOnComments={onClickOnComment} 
                    onClickDelete={onClickDelete}
                    onDownVote={onDownVotePost} 
<<<<<<< Updated upstream
                    onUpVote={onUpVotePost}
                    onClickOnPost={onClickOnPost}
                    isMine={isMine}
                /> 
                <NewComment 
                    content={newComment}              
                    onChangeContent={setNewComment}   
                    onAddComment={() => handleAddComment()} 
=======
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
>>>>>>> Stashed changes
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