import { Profile } from "../../../domain";
import Loading from "../../components/atoms/loading/loading";
import NoResults from "../../components/atoms/no-results/no-results";
import PostsList from "../../components/organisms/posts-list/posts-list";
import ProfileList from "../../components/organisms/profile-list/profile-list";
import { SearchPage     } from "../../components/organisms/search-page/search-page";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function SearchRoute() {

const {
    userId,
    loading,
    pageTypes,
    contentTypes,
    styles,
    instruments,
    selectedContentType,
    selectedStyle,
    selectedInstrument,
    selectedPageType,
    handlePageTypeChange,
    handleTypeChange,
    handleStyleChange,
    handleInstrumentChange,
    posts,
    profiles,
    pages,
    searchText,
    handleSearchChange,
    searchAttempted,
    hasResults,
    handleVotePost,
    onClickOnComments,
    onClickOnAvatar,
    onClickDelete,
    onClickOnPost,
    onClickOnProfile,
    toggleFollow,
} = ViewModel();

    return (
        <Layout withHeader={true}>
            {(
                <>
                    <SearchPage 
                        contentTypes={contentTypes} 
                        styles={styles} 
                        instruments={instruments} 
                        pageTypes={pageTypes}
                        onInstrumentChange={handleInstrumentChange} 
                        onStyleChange={handleStyleChange} 
                        onTypeChange={handleTypeChange} 
                        selectedContentType={selectedContentType}
                        selectedStyle={selectedStyle}
                        selectedPageType={selectedPageType}
                        selectedInstrument={selectedInstrument}
                        searchText={searchText}
                        onSearchChange={handleSearchChange}
                        onPageTypeChange={handlePageTypeChange}
                    />
                    {loading? <Loading /> : ( 
                        <>
                            {selectedContentType === "Posts" && posts.length > 0 && (
                            <PostsList 
                                posts={posts} 
                                handleVotePost={handleVotePost} 
                                onClickOnComments={onClickOnComments} 
                                onClickOnAvatar={onClickOnAvatar} 
                                onClickDelete={onClickDelete} 
                                onClickOnPost={onClickOnPost}
                            />
                            )}

                            {selectedContentType === "Usuarios" && profiles.length > 0 && (
                            <ProfileList 
                                profiles={profiles.map(user => user.toProfile())} 
                                toggleFollow={toggleFollow} 
                                onClickOnProfile={onClickOnProfile}
                                showDescription={true}
                                currentUserId={userId} 
                            />
                            )}
                        
                            {selectedContentType === "Páginas" && pages.length > 0 && (
                            <ProfileList 
                                profiles={pages.map(page => page.toProfile())} 
                                toggleFollow={toggleFollow}
                                onClickOnProfile={onClickOnProfile}
                            />
                            )}
                            
                            {searchAttempted && !hasResults && (
                                <NoResults />
                            )}
                        </>
                    )}
                </>
            )} 
        </Layout>
    );
}