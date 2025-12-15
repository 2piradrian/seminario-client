import Loading from "../../components/atoms/loading/loading";
import { SearchPage } from "../../components/organisms/search-page/search-page";
import SearchResults from "../../components/organisms/search-results/search-results";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function SearchRoute() {

    const {
        userId,
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
        setDateInit,
        setDateEnd,
        posts,
        users,
        pages,
        events,
        searchText,
        handleSearchChange,
        handleDateInitChange,
        handleDateEndChange,
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
        onTabClick,
        onLogout
    } = ViewModel();

    return (
        <Layout
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
        >
            {(
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

                    />
                    {loading ? <Loading /> : (
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
                        />
                    )}
                </>
            )}
        </Layout>
    );
}
