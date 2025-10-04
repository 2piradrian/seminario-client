import PostDetail from "../../components/organisms/post-detail/post-detail";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function PostDetailRoute() {

    const { 
        comments, 
        onClickOnAvatarComment,
        onClickOnAvatarPost,
        onClickOnComment,
        onDownVoteComment,
        onDownVotePost,
        onUpVoteComment,
        onUpVotePost,
        post
    } = ViewModel();


    return (
        <Layout withHeader={true}>
            { 
            post && comments &&
                <PostDetail 
                    comments={comments}
                    onClickOnAvatarComment={onClickOnAvatarComment}
                    onClickOnAvatarPost={onClickOnAvatarPost}
                    onClickOnComment={onClickOnComment}
                    onDownVoteComment={onDownVoteComment}
                    onDownVotePost={onDownVotePost}
                    onUpVoteComment={onUpVoteComment}
                    onUpVotePost={onUpVotePost}
                    post={post}
                />
            }
        </Layout>
    )
}