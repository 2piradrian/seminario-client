import PostDetail from "../../components/organisms/post-detail/post-detail";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function PostDetailRoute() {

    const { 
        rootComments, 
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
        isDeleteOpen,
        onClickEdit,
        replyTo,
        getReplies,
        toggleReplies,
        isExpanded,
        handleReply,
        isDeleteCommentOpen,
        onClickDeleteComment,
        cancelDeleteComment,
        proceedDeleteComment,
    } = ViewModel();

    return (
        <Layout withHeader={true}>
            { 
            post &&
                <PostDetail 
                    rootComments={rootComments}
                    getReplies={getReplies}
                    toggleReplies={toggleReplies}
                    isExpanded={isExpanded}
                    onReply={handleReply}
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
                    onClickEdit={onClickEdit}
                    replyTo={replyTo}
                    isDeleteCommentOpen={isDeleteCommentOpen}
                    onClickDeleteComment={onClickDeleteComment}
                    cancelDeleteComment={cancelDeleteComment}
                    proceedDeleteComment={proceedDeleteComment}
                />
            }
        </Layout>
    )
}