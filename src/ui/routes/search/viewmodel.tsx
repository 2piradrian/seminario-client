import { useNavigate } from "react-router-dom";
import { EntityType, resolveEntityType, useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import { ContentType, Errors, Instrument, PageProfile, PageType, Post, Profile, Style, UserProfile, Vote, type GetAllContentTypeRes, type GetAllInstrumentRes, type GetAllPageTypeRes, type GetAllStyleRes, type GetSearchResultFilteredReq, type GetSearchResultFilteredRes, type ToggleFollowReq, type TogglePostVotesReq } from "../../../domain";
import useSession from "../../hooks/useSession";
import toast from "react-hot-toast";

export default function ViewModel() {

    const navigate = useNavigate();
    const { userId, session } = useSession();
    const { catalogRepository , resultRepository, postRepository, followRepository} = useRepositories();

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

    const isSearchDisabled = !selectedContentType || selectedContentType === "Seleccionar";
    const showExtraFilters = selectedContentType === 'Usuarios' || selectedContentType === 'Páginas';

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
        if (isSearchDisabled) {
            toast.error("Por favor, selecciona un tipo de contenido antes de buscar.");
        }
        setSearchText(text);
    }

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
    
    const toggleFollow = async (profile: Profile) => {
        try {
            await followRepository.toggleFollow({
                session: session,
                id: profile.id
            } as ToggleFollowReq);

            setProfiles(prevProfiles =>
                prevProfiles.map(p =>
                    p.id === profile.id
                        ? UserProfile.fromObject({ 
                              ...p, 
                              isFollowing: !p.isFollowing
                          })
                        : p
                )
            );

            toast.success(
                profile.isFollowing
                    ? "Dejaste de seguir a " + profile.displayName
                    : "Ahora sigues a " + profile.displayName
            );
            
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onClickDelete = () => {};

    const onClickOnPost = (postId: string) => {
        navigate(`/post-detail/${postId}`);
    };

    const onClickOnComments = (postId: string) => {
        navigate(`/post/${postId}`)
    };

    const onClickOnProfile = (profile: Profile) => {
        if (resolveEntityType(profile.id) === EntityType.PAGE) {
            navigate(`/page/${profile.id}`);
        } 
        else {
            navigate(`/user/${profile.id}`);
        }
    };

    const onClickOnAvatar = (post : Post) => {
        if (post.author?.id && !post.pageProfile?.id){
            navigate(`/user/${post.author.id}`);
        }
        else if (post.pageProfile?.id){
            navigate(`/page/${post.pageProfile.id}`);
        }     
    }
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
        onClickOnProfile,
        userId,
    };
}
