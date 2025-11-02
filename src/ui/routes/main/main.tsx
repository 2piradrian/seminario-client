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
    onClickOnPost,
    onClickOnCreatePost
} = ViewModel();

  return (
    <Layout withHeader>
      { user &&
        <MainFeed
           user={user}
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
