import PostsFeed from "../../components/organisms/posts-feed/posts-feed";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function PostsRoute() {
    const { user, 
    onProfileClick,
    onClickOnAvatar,
    onClickOnComments,
    handleVotePost,
    posts,
    pages,
    onClickOnPost,
    onLogout,
    onClickOnCreatePost
} = ViewModel();

    return(
        <Layout 
            withHeader
            headerProfile={user ? user.toProfile() : undefined}
            onLogout={onLogout}
        >
            { user &&
                    <PostsFeed
                       user={user}
                       pages={pages}
                       onProfileClick={onProfileClick}
                       onClickOnAvatar={onClickOnAvatar}
                       onClickOnComments={onClickOnComments}
                       handleVotePost={handleVotePost}
                       posts={posts}
                       onClickOnPost={onClickOnPost}
                       onClickOnCreatePost={onClickOnCreatePost}
                    />
                  }
        </Layout>
    )
}