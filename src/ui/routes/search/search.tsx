import { Profile } from "../../../domain";
import PostsList from "../../components/organisms/posts-list/posts-list";
import ProfileList from "../../components/organisms/profile-list/profile-list";
import { SearchPage     } from "../../components/organisms/search-page/search-page";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function SearchRoute() {

const {
        contentTypes,
        styles,
        instruments,
        selectedType,
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
        showExtraFilters,
        searchText,
        handleSearchChange,
        searchAttempted,
        hasResults,
        handleVotePost,
        onClickOnComments,
        onClickOnAvatar,
        onClickDelete,
        onClickOnPost,
        toggleFollow,
        pageTypes,
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
                        selectedType={selectedType}
                        selectedStyle={selectedStyle}
                        selectedInstrument={selectedInstrument}
                        showExtraFilters={showExtraFilters}
                        searchText={searchText}
                        onSearchChange={handleSearchChange}
                        selectedPageType={selectedPageType}
                        onPageTypeChange={handlePageTypeChange}
                    />
                    
                    {selectedType === "Posts" && posts.length > 0 && (
                        <PostsList 
                            posts={posts} 
                            handleVotePost={handleVotePost} 
                            onClickOnComments={onClickOnComments} 
                            onClickOnAvatar={onClickOnAvatar} 
                            onClickDelete={onClickDelete} 
                            onClickOnPost={onClickOnPost}
                        />
                    )}

                    {selectedType === "Usuarios" && profiles.length > 0 && (
                        <ProfileList 
                            profiles={profiles.map(user => Profile.fromEntity(user, null))} 
                            toggleFollow={toggleFollow} 
                        />
                    )}
                    
                    {selectedType === "Páginas" && pages.length > 0 && (
                    <ProfileList 
                        profiles={pages.map(page => Profile.fromEntity(undefined, page))} 
                        toggleFollow={toggleFollow} 
                    />
                    )}
                    
                    {searchAttempted && !hasResults && (
                        <p>No se encontraron resultados para tu búsqueda.</p>
                    )}
                </>
            )} 
        </Layout>
    );
}