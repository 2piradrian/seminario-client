import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import { Errors, Instrument, PageProfile, PageType, Post, Style, UserProfile, Vote, type GetAllInstrumentRes, type GetAllPageTypeRes, type GetAllStyleRes, type GetSearchResultFilteredReq, type GetSearchResultFilteredRes, type ToggleFollowReq, type TogglePostVotesReq } from "../../../domain";
import toast from "react-hot-toast";
import type { GetAllContentTypeRes } from "../../../domain/dto/catalog/response/GetAllContentTypeRes";
import { ContentType } from "../../../domain/entity/content-type";

export default function ViewModel() {
    const navigate = useNavigate();
    const { session } = useSession();
    const { id } = useParams();
    const { catalogRepository , resultRepository, postRepository, userProfileRepository} = useRepositories();

    const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
    const [styles, setStyles] = useState<Style[]>([]);
    const [instruments, setInstruments] = useState<Instrument[]>([]);
    const [pageTypes, setPageTypes] = useState<PageType[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchText, setSearchText] = useState<string>("");

    const [selectedContentType, setSelectedContentType] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const [selectedInstrument, setSelectedInstrument] = useState<string | null>(null);
    const [selectedPageType, setSelectedPageType] = useState<string | null>(null);


    const [posts, setPosts] = useState<Post[]>([]);
    const [profiles, setProfiles] = useState<UserProfile[]>([]);
    const [pages, setPages] = useState<PageProfile[]>([]);

    const showExtraFilters = selectedContentType === 'Usuarios' || selectedContentType === 'Páginas';

    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        const searchData = async () => {
            if (!selectedContentType || selectedContentType === "Seleccionar") {
                setPosts([]);
                setProfiles([]);
                setPages([]);
                return;
            }
            setLoading(true);
            try {
                const styleObject = Style.toOptionable(selectedStyle, styles);
                const instrumentObject = Instrument.toOptionable(selectedInstrument, instruments);
                const pageTypeObject = PageType.toOptionable(selectedPageType, pageTypes);
                const contentTypeObject = ContentType.toOptionable(selectedContentType, contentTypes);

                const requestDto: GetSearchResultFilteredReq = {
                    page: 1, 
                    size: 15,
                    text: searchText || '',
                    styles: styleObject ? [styleObject] : [],
                    instruments: instrumentObject ? [instrumentObject] : [],
                    pageTypeId: pageTypeObject ? pageTypeObject.id : '',
                    contentTypeId: contentTypeObject ? contentTypeObject.id : '',
                    session: session
                };
                const response: GetSearchResultFilteredRes = await resultRepository.getSearchResult(requestDto);
                setPosts(response.posts ? response.posts.map(p => Post.fromObject(p)) : []);
                setProfiles(response.userProfiles ? response.userProfiles.map(u => UserProfile.fromObject(u)) : []);
                setPages(response.pageProfiles ? response.pageProfiles.map(pp => PageProfile.fromObject(pp)) : []);
            } 
            catch (error) {
                toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
            }
        };
        searchData().then(() => setLoading(false));
    }, [selectedContentType, selectedStyle, selectedInstrument, selectedPageType, searchText, session]);

    useEffect(() => {
        setLoading(true);
        const fetchCatalog = async () => {
                try {
                    const stylesResponse: GetAllStyleRes = await catalogRepository.getAllStyle();
                    const instrumentsResponse: GetAllInstrumentRes = await catalogRepository.getAllInstrument();
                    const contentTypeResponse: GetAllContentTypeRes = await catalogRepository.getAllContentType();
                    const pageTypeResponse: GetAllPageTypeRes = await catalogRepository.getAllPageType();

                    if (stylesResponse) {
                        setStyles([...stylesResponse.styles]);
                    }
                    if (instrumentsResponse) {
                        setInstruments([...instrumentsResponse.instruments]);
                    }
                    if (contentTypeResponse) {
                        setContentTypes([...contentTypeResponse.contentTypes]);
                    }   
                    if (pageTypeResponse) {
                        setPageTypes([...pageTypeResponse.pageTypes]);
                    }
                }
                catch (error) {
                    toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
                }
            };

            if(session) {
                fetchCatalog().then(() => setLoading(false));
            }
    }, [session]);
        
    const handleTypeChange = (value: string) => {
            setSelectedContentType(value);
            setSelectedStyle(null);
            setSelectedInstrument(null);
            setSelectedPageType(null);
    };

    const handleStyleChange = (value: string) => {
        setSelectedStyle(value === "Seleccionar" ? null : value);
    };

    const handleInstrumentChange = (value: string) => {
        setSelectedInstrument(value === "Seleccionar" ? null : value);
    };

    const handleSearchChange = (text: string) => {
        setSearchText(text);
    };

    const handlePageTypeChange = (value: string) => {
    setSelectedPageType(value === "Seleccionar" ? null : value);
    };

    const handleVotePost = async (postId: string, voteType: Vote) => {
        try {
            const response = await postRepository.toggleVotes({
                session: session,
                voteType: voteType,
                postId: postId,
            } as TogglePostVotesReq);

            const updatedPost = Post.fromObject(response);

            setPosts(prevPosts =>
                prevPosts.map(post => (post.id === postId ? updatedPost : post))
            );
        } 
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const toggleFollow = async () => {
        try {
            await userProfileRepository.toggleFollow({
                session: session,
                id: id
            } as ToggleFollowReq);


            if (userProfile.isFollowing) { 
                updateFollowsCounter(false, -1)

            }
            else {    
                updateFollowsCounter(true, 1)
            }
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };
    
    const updateFollowsCounter = (follow: boolean, quantity: number) => {
        const updated: UserProfile = {
            ...userProfile,
            followersCount: userProfile.followersCount + quantity,
            isFollowing: follow
        };
        setUserProfile(updated);
    }

    const onClickDelete = () => {};

    const onClickOnPost = (postId: string) => {
        navigate(`/post-detail/${postId}`);
    };

    const onClickOnComments = (postId: string) => {
        navigate(`/post-detail/${postId}`)
    };

    const onClickOnAvatar = () => {};

    const searchAttempted = selectedContentType && selectedContentType !== "Seleccionar";

    const hasResults =
        (selectedContentType === "Posts" && posts.length > 0) ||
        (selectedContentType === "Usuarios" && profiles.length > 0) ||
        (selectedContentType === "Páginas" && pages.length > 0);

    return {
        loading,
        pageTypes,
        contentTypes,
        styles,
        instruments,
        handleTypeChange,
        handleStyleChange,
        handleInstrumentChange,
        handlePageTypeChange,
        selectedStyle,
        selectedContentType,
        selectedInstrument,
        selectedPageType,
        posts,
        profiles,
        pages,
        showExtraFilters,
        handleSearchChange,
        searchText,
        searchAttempted,
        hasResults,
        handleVotePost,
        onClickOnPost,
        onClickOnComments,    
        onClickOnAvatar,
        onClickDelete,
        toggleFollow,
    };
}
