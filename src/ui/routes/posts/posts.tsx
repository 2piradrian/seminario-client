import GenericFeed from "../../components/organisms/generic-feed/generic-feed";
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
    onClickOnCreatePost,
    postTypes,
    isEvent,
    isPost,
    cancelDelete,
    onClickCancel,
    onClickDelete
} = ViewModel();


    return(
        <Layout 
            withHeader
            headerProfile={user ? user.toProfile() : undefined}
            onLogout={onLogout}
        >
            { user && postTypes.length  &&
                    <GenericFeed
                        user={user}
                        onProfileClick={onProfileClick}
                        onClickOnAvatarItem={onClickOnAvatar}
                        onClickOnComments={onClickOnComments}
                        handleVotePost={handleVotePost}
                        items={posts}
                        onClickOnItem={onClickOnPost}
                        onClickOnCreateItem={onClickOnCreatePost}
                        postTypes={postTypes}
                        isPost={isPost}
                        isEvent={isEvent}
                        onClickCancel={onClickCancel}
                        onClickDelete={onClickDelete}
                        createButtonText="Crear nueva publicación"
                    />
                  }
        </Layout>
    )
}