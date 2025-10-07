import { Vote, type Comment, type Post, type Profile } from "../../../../domain";
import PostItem from "../../molecules/post-item/post-item";
import NewComment from "../../atoms/new-comment/new-comment";
import CommentsList from "../comments-list/comments-list";
import style from "./style.module.css"; 
import Modal from "../../molecules/modal/modal";

type Props = {
    post: Post;
    onClickOnAvatarPost: () => void; 
    onClickOnComment: () => void;
    handleVotePost: (postId: string, voteType: Vote) => Promise<void>
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
    cancelDelete: () => void;
    proceedDelete: () => void;
    isDeleteOpen: boolean;
    
}

export default function PostDetail({
    post, onClickOnAvatarPost, onClickOnComment, handleVotePost, 
    isMine, onClickOnPost, onClickDelete, handleAddComment,
    cancelDelete, proceedDelete, isDeleteOpen,
    profiles, onClickOnAvatarComment, onClickOnComments, onDownVoteComment, onUpVoteComment, comments
}: Props)  {
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
                    onUpVote={() => handleVotePost(post.id, Vote.UPVOTE)}
                    onDownVote={() => handleVotePost(post.id, Vote.DOWNVOTE)}
                />
            </div> 
            <NewComment 
                onAddComment={handleAddComment}
                profiles={profiles}
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