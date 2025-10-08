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
        handleVoteComment,
        handleVotePost,
        isMine,
        onClickOnPost,
        post,
        handleAddComment,
        profiles,
        proceedDelete,
        cancelDelete,
        isDeleteOpen
    } = ViewModel();

    return (
        <Layout withHeader={true}>
            { 
            post && comments &&
                <PostDetail 
                    comments={comments}
                    onClickOnComments={onClickOnComments}
                    onClickOnAvatarComment={onClickOnAvatarComment}
                    onClickOnAvatarPost={onClickOnAvatarPost}
                    onClickOnComment={onClickOnComment}
                    onClickDelete={onClickDelete}
                    handleVoteComment={handleVoteComment}
                    handleVotePost={handleVotePost}
                    post={post}
                    isMine={isMine}
                    onClickOnPost={onClickOnPost}
                    handleAddComment={handleAddComment}
                    profiles={profiles}
                    isDeleteOpen={isDeleteOpen}
                    proceedDelete={proceedDelete}
                    cancelDelete={cancelDelete}
                />
            }
        </Layout>
    )
}