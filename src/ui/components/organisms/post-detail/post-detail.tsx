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
    post, onClickOnAvatarPost, onClickOnComment, onDownVotePost, onUpVotePost, 
    comments, onClickOnAvatarComment, onDownVoteComment, onUpVoteComment,
    onClickOnComments, onClickDelete, isMine, onClickOnPost,
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
                    onUpVote={onUpVotePost}
                    onClickOnPost={onClickOnPost}
                    isMine={isMine}
                /> 
                <NewComment 
                    content={newComment}              
                    onChangeContent={setNewComment}   
                    onAddComment={() => handleAddComment()} 
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