import Loading from "../../components/atoms/loading/loading";
import { SearchPage } from "../../components/organisms/search-page/search-page";
import SearchResults from "../../components/organisms/search-results/search-results";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function SearchRoute() {
    const {
        user,
        loading,
        pageTypes,
        postTypes,
        styles,
        instruments,
        activeTab,
        selectedStyle,
        selectedInstrument,
        selectedPageType,
        selectedPostType,
        dateInit,
        dateEnd,
        handlePageTypeChange,
        handleStyleChange,
        handleInstrumentChange,
        handlePostTypeChange,
        searchText,
        handleSearchChange,
        handleDateInitChange,
        handleDateEndChange,
        searchAttempted,
        hasResults,
        shouldShowEmpty,
        posts,
        users,
        pages,
        events,
        onClickOnPost,
        onClickOnProfile,
        onClickOnEvent,
        toggleFollow,
        onTabClick,
        onLogout,
        showFilters,
        toggleFilters
    } = ViewModel();

    return (
        <Layout
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
            user={user}
        >
            <>
                <SearchPage
                    styles={styles}
                    instruments={instruments}
                    pageTypes={pageTypes}
                    postTypes={postTypes}
                    onInstrumentChange={handleInstrumentChange}
                    onStyleChange={handleStyleChange}
                    activeTab={activeTab}
                    selectedStyle={selectedStyle}
                    selectedPageType={selectedPageType}
                    selectedInstrument={selectedInstrument}
                    selectedPostType={selectedPostType}
                    searchText={searchText}
                    onPageTypeChange={handlePageTypeChange}
                    onPostTypeChange={handlePostTypeChange}
                    onSearchChange={handleSearchChange}
                    dateInit={dateInit}
                    dateEnd={dateEnd}
                    onDateEndChange={handleDateEndChange}
                    onDateInitChange={handleDateInitChange}
                    onTabClick={onTabClick}
                    showFilters={showFilters}
                    onToggleFilters={toggleFilters}
                />
                {loading ? (
                    <Loading />
                ) : (
                    <SearchResults
                        loading={loading}
                        searchAttempted={searchAttempted}
                        hasResults={hasResults}
                        shouldShowEmpty={shouldShowEmpty}
                        activeTab={activeTab}
                        posts={posts}
                        users={users}
                        pages={pages}
                        events={events}
                        onClickOnPost={onClickOnPost}
                        onClickOnProfile={onClickOnProfile}
                        onClickOnEvent={onClickOnEvent}
                        toggleFollow={toggleFollow}
                    />
                )}
            </>
        </Layout>
    );
}
