import { useEffect } from "react";
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
        isMyComment,
        isAdminOrMod,
        activeMenuId,
        toggleMenu,
        closeMenu,
        onLogout,
        postTypes,
        handleSharePost,
        user,
        moderationReasonOptions,
        selectedDeleteReason,
        setSelectedDeleteReason,
        shouldShowDeleteReasonSelector,
        selectedCommentDeleteReason,
        setSelectedCommentDeleteReason,
        shouldShowDeleteCommentReasonSelector
    } = ViewModel();

    useEffect(() => {
    }, [postTypes]);

    return (
        <Layout 
            withHeader={true}
            headerProfile={profiles && profiles[0] ? profiles[0] : undefined}
            onLogout={onLogout}
            user={user}
        >
            { 
            post && postTypes.length !==0 &&
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
                    isMyComment={isMyComment}
                    isAdminOrMod={isAdminOrMod}
                    activeMenuId={activeMenuId}
                    onToggleMenu={toggleMenu}
                    onCloseMenu={closeMenu}
                    postTypes={postTypes}
                    onClickSharePost={handleSharePost}
                    showDeleteReasonSelector={shouldShowDeleteReasonSelector}
                    moderationReasonOptions={moderationReasonOptions}
                    selectedDeleteReason={selectedDeleteReason}
                    onDeleteReasonChange={setSelectedDeleteReason}
                    showDeleteCommentReasonSelector={shouldShowDeleteCommentReasonSelector}
                    selectedDeleteCommentReason={selectedCommentDeleteReason}
                    onDeleteCommentReasonChange={setSelectedCommentDeleteReason}
                />
            }
        </Layout>
    )
}
