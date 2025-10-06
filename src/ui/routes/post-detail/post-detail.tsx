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
        isMine,
        onClickOnPost,
        post,
        handleAddComment,
        profiles
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
                    onDownVoteComment={onDownVoteComment}
                    onDownVotePost={onDownVotePost}
                    onUpVoteComment={onUpVoteComment}
                    onUpVotePost={onUpVotePost}
                    post={post}
                    isMine={isMine}
                    onClickOnPost={onClickOnPost}
                    handleAddComment={handleAddComment}
                    profiles={profiles}
                />
            }
        </Layout>
    )
}