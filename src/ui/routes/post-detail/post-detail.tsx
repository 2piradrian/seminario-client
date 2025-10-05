import PostDetail from "../../components/organisms/post-detail/post-detail";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function PostDetailRoute() {

    const { 
        comments, 
        onClickOnComments,
        onClickOnAvatarComment,
        onClickOnAvatarPost,
        onClickOnComment,
        onClickDelete,
        onDownVoteComment,
        onDownVotePost,
        onUpVoteComment,
        onUpVotePost,
<<<<<<< Updated upstream
        isMine,
        onClickOnPost,
        post,
        handleAddComment,
        setNewComment,
        newComment
=======
        newComment,
        setNewComment,
        handleAddComment,
        post
>>>>>>> Stashed changes
    } = ViewModel();


    return (
        <Layout withHeader={true}>
            { 
            post && comments &&
                <PostDetail 
                    newComment={newComment}
                    setNewComment={setNewComment} 
                    handleAddComment={handleAddComment} 
                    comments={comments}
                    onClickOnComments={onClickOnComments}
                    onClickOnAvatarComment={onClickOnAvatarComment}
                    onClickOnAvatarPost={onClickOnAvatarPost}
                    onClickOnComment={onClickOnComment}
                    onClickDelete={onClickDelete}
                    onDownVoteComment={onDownVoteComment}
                    onDownVotePost={onDownVotePost}
                    onUpVoteComment={onUpVoteComment}
                    onUpVotePost={onUpVotePost}
                    post={post}
                    isMine={isMine}
                    onClickOnPost={onClickOnPost}
                    handleAddComment={handleAddComment}
                    newComment={newComment}
                    setNewComment={setNewComment}
                />
            }
        </Layout>
    )
}