import Layout from "../../layout/layout";
import MainFeed from "../../components/organisms/main-feed/main-feed";
import ViewModel from "./viewmodel";

export default function MainRoute() {
  const { 
    user, 
    onProfileClick,
    onClickOnAvatar,
    onClickOnComments,
    handleVotePost,
    posts,
    pages,
    onClickOnPost,
    onClickOnCreatePost,
    onLogout
} = ViewModel();

  return (
    <Layout 
      withHeader
      headerProfile={user ? user.toProfile() : undefined}
      onLogout={onLogout}
    >
      { user &&
        <MainFeed
           user={user}
           pages={pages}
           onClickOnCreatePost={onClickOnCreatePost}
           onProfileClick={onProfileClick}
           onClickOnAvatar={onClickOnAvatar}
           onClickOnComments={onClickOnComments}
           handleVotePost={handleVotePost}
           posts={posts}
           onClickOnPost={onClickOnPost}
        />
      }
      
    </Layout>
  );
}
