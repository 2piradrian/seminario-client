import PagesFeed from "../../components/organisms/pages-feed/pages-feed";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function PagesRoute() {
    const { 
        user,
        items,
        onClickOnAvatarItem,
        onClickOnItem,
        onClickOnComments,
        handleVotePost,
        onLogout,
        postTypes,
        onProfileClick,
        onClickCancel,
        onClickDelete,
        isEvent,
        isPost
    } = ViewModel();
    
        return(
            <Layout 
                withHeader
                headerProfile={user ? user.toProfile() : undefined}
                onLogout={onLogout}
            >
                { user && postTypes.length && 
                        <PagesFeed
                            items={items}
                            user={user}
                            postTypes={postTypes}
                            onClickOnItem={onClickOnItem}
                            onClickOnAvatarItem={onClickOnAvatarItem}
                            onClickOnComments={onClickOnComments}
                            handleVotePost={handleVotePost}
                            onProfileClick={onProfileClick}
                            onClickDelete={onClickDelete}
                            onClickCancel={onClickCancel}
                            isPost={isPost}
                            isEvent={isEvent}
                        />
                      }
            </Layout>
        )
}