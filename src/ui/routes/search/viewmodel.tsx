import { useNavigate } from "react-router-dom";
import { PrefixedUUID, Tabs, useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import { ContentType, EntityType, Errors, Event, Instrument, PageProfile, PageType, Post, Profile, Style, User, Vote, type GetAllContentTypeRes, type GetAllInstrumentRes, type GetAllPageTypeRes, type GetAllStyleRes, type GetSearchResultFilteredReq, type GetSearchResultFilteredRes, type ToggleFollowReq, type TogglePostVotesReq } from "../../../domain";
import useSession from "../../hooks/useSession";
import toast from "react-hot-toast";

export default function ViewModel() {

    const navigate = useNavigate();
    const { userId, session } = useSession();
    const { catalogRepository , resultRepository, postRepository, followRepository} = useRepositories();

    const [styles, setStyles] = useState<Style[]>([]);
    const [instruments, setInstruments] = useState<Instrument[]>([]);
    const [pageTypes, setPageTypes] = useState<PageType[]>([]);
    const [contentTypes, setContentTypes] = useState<ContentType[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchText, setSearchText] = useState<string>("");
    const [dateInit, setDateInit] = useState<string>("");
    const [dateEnd, setDateEnd] = useState<string>("");

    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const [selectedInstrument, setSelectedInstrument] = useState<string | null>(null);
    const [selectedPageType, setSelectedPageType] = useState<string | null>(null);

    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [pages, setPages] = useState<PageProfile[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [searchAttempted, setSearchAttempted] = useState<boolean>(false);

    const [activeTab, setActiveTab] = useState<string>(Tabs.results[0].id); 
    const showExtraFilters = (activeTab === ContentType.USERS || activeTab === ContentType.PAGES || activeTab === ContentType.EVENTS);

    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        const searchData = async () => {
            if (!activeTab || contentTypes.length === 0) {
                setPosts([]);
                setUsers([]);
                setPages([]);
                setEvents([]);
                return;
            }
            setLoading(true);
            setSearchAttempted(true);
            try {
                const styleObject = Style.toOptionable(selectedStyle, styles);
                const instrumentObject = Instrument.toOptionable(selectedInstrument, instruments);
                const pageTypeObject = PageType.toOptionable(selectedPageType, pageTypes);
                const contentTypeObject = contentTypes.find(c => c.id === activeTab);

                const requestDto: GetSearchResultFilteredReq = {
                    page: 1, 
                    size: 15,
                    text: searchText || '',
                    styles: styleObject ? [styleObject] : [],
                    instruments: instrumentObject ? [instrumentObject] : [],
                    pageTypeId: pageTypeObject ? pageTypeObject.id : '',
                    contentTypeId: contentTypeObject ? contentTypeObject.id : '',
                    dateInit: dateInit ? new Date(dateInit) : undefined,
                    dateEnd: dateEnd ? new Date(dateEnd) : undefined,
                    session: session
                };
                const response: GetSearchResultFilteredRes = await resultRepository.getSearchResult(requestDto);
                setPosts(response.posts ? response.posts.map(p => Post.fromObject(p)) : []);
                setUsers(response.users ? response.users.map(u => User.fromObject(u)) : []);
                setPages(response.pageProfiles ? response.pageProfiles.map(pp => PageProfile.fromObject(pp)) : []);
                setEvents(response.events ? response.events.map(e => Event.fromObject(e)) : []);
            } 
            catch (error) {
                toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
            }
        };
        searchData().then(() => setLoading(false));
    }, [activeTab, selectedStyle, selectedInstrument, selectedPageType, searchText, dateInit, dateEnd, session, contentTypes]);

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
        
    const onTabClick = (tab: string) => {
            setActiveTab(tab);
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

    const handlePageTypeChange = (value: string) => {
    setSelectedPageType(value === "Seleccionar" ? null : value);
    };

    const handleDateInitChange = (value: string) => {
        setDateInit(value);
    };

    const handleDateEndChange = (value: string) => {
        setDateEnd(value);
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
    const handleSearchChange = (text: string) => {
        if (!activeTab) {
            toast.error("Por favor, selecciona un tipo de contenido antes de buscar.");
        }
        setSearchText(text);
    }
    
    const toggleFollow = async (profile: Profile) => {
        try {
            await followRepository.toggleFollow({
                session: session,
                id: profile.id
            } as ToggleFollowReq);

            setUsers(prevProfiles =>
                prevProfiles.map(p =>
                    p.id === profile.id
                        ? User.fromObject({ 
                              ...p, 
                              isFollowing: !p.profile.isFollowing
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
        navigate(`/post-detail/${postId}`)
    };

    const onClickOnEvent = (eventId: string) => {
        navigate(`/event-detail/${eventId}`);
    };

    const onClickOnProfile = (profile: Profile) => {
        if (PrefixedUUID.resolveType(profile.id) === EntityType.PAGE) {
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
    
    const hasResults = posts.length > 0 || users.length > 0 || pages.length > 0 || events.length > 0;

    return {
        loading,
        pageTypes,
        styles,
        instruments,
        handleStyleChange,
        handleInstrumentChange,
        handlePageTypeChange,
        handleDateInitChange,
        handleDateEndChange,
        selectedStyle,
        selectedInstrument,
        selectedPageType,
        dateInit,
        dateEnd,
        posts,
        users,
        pages,
        events,
        showExtraFilters,
        searchText,
        searchAttempted,
        hasResults,
        handleVotePost,
        handleSearchChange,
        onClickOnPost,
        onClickOnComments,    
        onClickOnAvatar,
        onClickDelete,
        toggleFollow,
        onClickOnProfile,
        onClickOnEvent,
        userId,
        onTabClick,
        activeTab
    };
}