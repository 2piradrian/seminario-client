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
        handleTypeChange,
        handleStyleChange,
        handleInstrumentChange,
        posts,
        profiles,
        pages,
        showExtraFilters,
        searchText,
        handleSearchChange
    } = ViewModel();

    return (
        <Layout withHeader={true}>
            {(
                <>
                    <SearchPage 
                        contentTypes={contentTypes} 
                        styles={styles} 
                        instruments={instruments} 
                        onInstrumentChange={handleInstrumentChange} 
                        onStyleChange={handleStyleChange} 
                        onTypeChange={handleTypeChange} 
                        selectedType={selectedType}
                        selectedStyle={selectedStyle}
                        selectedInstrument={selectedInstrument}
                        showExtraFilters={showExtraFilters}
                        searchText={searchText}
                        onSearchChange={handleSearchChange}
                    />
                    {posts.length > 0 && (
                        <PostsList posts={posts} /*  */ />
                    )}

                    {profiles.length > 0 && (
                        <ProfileList profiles={profiles} /*  */ />
                    )}

                    {pages.length > 0 && (
                        <ProfileList profiles={pages} /*  */ />
                    )}
                </>
            )} 
        </Layout>
    );
}