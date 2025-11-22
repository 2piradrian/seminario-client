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
    dateInit,
    dateEnd, 
    handlePageTypeChange,
    handleStyleChange,
    handleInstrumentChange,
    setDateInit,
    setDateEnd, 
    posts,
    users,
    pages,
    events,
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
    onClickOnEvent,
    toggleFollow,
    onTabClick
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
                        activeTab={activeTab}
                        selectedStyle={selectedStyle}
                        selectedPageType={selectedPageType}
                        selectedInstrument={selectedInstrument}
                        searchText={searchText}
                        onPageTypeChange={handlePageTypeChange}
                        onSearchChange={handleSearchChange}
                        dateInit={dateInit}
                        dateEnd={dateEnd}
                        setDateInit={setDateInit}
                        setDateEnd={setDateEnd}
                        
                    />
                    {loading? <Loading /> : ( 
                        <SearchResults
                            loading={loading}
                            activeTab={activeTab}
                            posts={posts}
                            users={users}
                            pages={pages}
                            events={events}
                            userId={userId}
                            searchAttempted={searchAttempted}
                            hasResults={hasResults}
                            handleVotePost={handleVotePost}
                            onClickOnComments={onClickOnComments}
                            onClickOnAvatar={onClickOnAvatar}
                            onClickDelete={onClickDelete}
                            onClickOnPost={onClickOnPost}
                            onClickOnProfile={onClickOnProfile}
                            onClickOnEvent={onClickOnEvent}
                            toggleFollow={toggleFollow}
                            onTabClick={onTabClick}
                        />
                    )}
                </>
            )} 
        </Layout>
    );
}