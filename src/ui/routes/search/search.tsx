import Loading from "../../components/atoms/loading/loading";
import { SearchPage } from "../../components/organisms/search-page/search-page";
import SearchResults from "../../components/organisms/search-results/search-results";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function SearchRoute() {

const {
    userId,
    loading,
    pageTypes,
    styles,
    instruments,
    activeTab,
    selectedStyle,
    selectedInstrument,
    selectedPageType,
    handlePageTypeChange,
    handleStyleChange,
    handleInstrumentChange,
    posts,
    users,
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
                        styles={styles} 
                        instruments={instruments} 
                        pageTypes={pageTypes}
                        onInstrumentChange={handleInstrumentChange} 
                        onStyleChange={handleStyleChange} 
                        selectedContentType={activeTab}
                        selectedStyle={selectedStyle}
                        selectedPageType={selectedPageType}
                        selectedInstrument={selectedInstrument}
                        searchText={searchText}
                        onPageTypeChange={handlePageTypeChange}
                        onSearchChange={handleSearchChange}
                    />
                    {loading? <Loading /> : ( 
                        <SearchResults
                            loading={loading}
                            activeTab={activeTab}
                            posts={posts}
                            users={users}
                            pages={pages}
                            userId={userId}
                            searchAttempted={searchAttempted}
                            hasResults={hasResults}
                            handleVotePost={handleVotePost}
                            onClickOnComments={onClickOnComments}
                            onClickOnAvatar={onClickOnAvatar}
                            onClickDelete={onClickDelete}
                            onClickOnPost={onClickOnPost}
                            onClickOnProfile={onClickOnProfile}
                            toggleFollow={toggleFollow}
                        />
                    )}
                </>
            )} 
        </Layout>
    );
}