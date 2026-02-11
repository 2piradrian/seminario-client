import Layout from "../../layout/layout";
import GenericFeed from "../../components/organisms/generic-feed/generic-feed";
import ViewModel from "./viewmodel";

export default function HomeRoute() {
  const { 
    user, 
    onProfileClick,
    onClickOnAvatar,
    onClickOnComments,
    handleVotePost,
    posts,
    onClickOnPost,
    onLogout,
    postTypes,
    onClickCancel, 
    onClickDelete,
	handleSharePost
} = ViewModel();

  return (
    <Layout
      withHeader
      headerProfile={user ? user.toProfile() : undefined}
      onLogout={onLogout}
      user={user}
    >
      { user && postTypes.length !== 0 &&
        <GenericFeed
           	user={user}
		    onProfileClick={onProfileClick}
			onClickOnAvatarItem={onClickOnAvatar}
			onClickOnComments={onClickOnComments}
			handleVotePost={handleVotePost}
			items={posts}
			onClickOnItem={onClickOnPost}
			postTypes={postTypes}
		    onClickCancel={onClickCancel}
		    onClickDelete={onClickDelete}
			onClickSharePost={handleSharePost}
        />
      }
    </Layout>
  );
}
