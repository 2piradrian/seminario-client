import Layout from "../../layout/layout";
import MainFeed from "../../components/organisms/main-feed/main-feed";
import ViewModel from "./viewmodel";

export default function MainRoute() {
  const { 
    activeProfile, 
    onProfileClick,
    onClickOnAvatar,
    onClickOnComments,
    handleVotePost,
    posts,
    onClickOnPost,
    onClickOnCreatePost
} = ViewModel();
  if (!activeProfile) return null;

  return (
    <Layout withHeader>
      <MainFeed
        activeProfile={activeProfile}
        onClickOnCreatePost={onClickOnCreatePost}
        onProfileClick={onProfileClick}
        onClickOnAvatar={onClickOnAvatar}
        onClickOnComments={onClickOnComments}
        handleVotePost={handleVotePost}
        posts={posts}
        onClickOnPost={onClickOnPost}
      />
    </Layout>
  );
}
