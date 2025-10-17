import PostsList from "../../components/organisms/posts-list/posts-list";
import ProfileList from "../../components/organisms/profile-list/profile-list";
import { SearchPage } from "../../components/organisms/search-page/search-page";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function SearchRoute() {

    const {
        types,
        categories,
        profile,
        posts,
        handleVotePost,
        onClickOnAvatar,
        onClickOnComments,
        onClickDelete,
        onClickOnPost,
        isMine,
        isPage,
        isUser
    } = ViewModel();

    return (
        <Layout withHeader={true}>
            {(
                <>
                    <SearchPage categories={categories} types={types} />

                    {isUser ? (
                        <ProfileList profiles={[profile]} />
                    ) : isPage ? (
                        <ProfileList profiles={[profile]} />
                    ) : (
                        <PostsList
                            onClickOnAvatar={onClickOnAvatar}
                            onClickOnComments={onClickOnComments}
                            onClickDelete={onClickDelete}
                            handleVotePost={handleVotePost}
                            posts={posts}
                            onClickOnPost={onClickOnPost}
                            isMine={isMine}
                        />
                    )}
                </>
            )}
        </Layout>
    );
}