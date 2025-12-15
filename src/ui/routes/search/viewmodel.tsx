import toast from "react-hot-toast";
import { ContentType, EntityType, Errors, Event, Instrument, PageProfile, PageType, Post, PostType, Profile, Style, User, Vote, type GetSearchResultFilteredReq, type GetSearchResultFilteredRes, type ToggleFollowReq, type TogglePostVotesReq, type GetUserByIdReq } from "../../../domain";
import { CONSTANTS, PrefixedUUID, Tabs, useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";

export default function ViewModel() {

    const navigate = useNavigate();
    const { userId, session } = useSession();
    const { catalogRepository, sessionRepository, resultRepository, postRepository, followRepository, userRepository } = useRepositories();

    // ---------- State ----------
    const [styles, setStyles] = useState<Style[]>([]);
    const [instruments, setInstruments] = useState<Instrument[]>([]);
    const [pageTypes, setPageTypes] = useState<PageType[]>([]);
    const [postTypes, setPostTypes] = useState<PostType[]>([]);
    const [contentTypes, setContentTypes] = useState<ContentType[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchText, setSearchText] = useState("");
    const [dateInit, setDateInit] = useState("");
    const [dateEnd, setDateEnd] = useState("");

    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const [selectedInstrument, setSelectedInstrument] = useState<string | null>(null);
    const [selectedPageType, setSelectedPageType] = useState<string | null>(null);
    const [selectedPostType, setSelectedPostType] = useState<string | null>(null);

    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [pages, setPages] = useState<PageProfile[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [searchAttempted, setSearchAttempted] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const toggleFilters = () => setShowFilters(prev => !prev);

    const [activeTab, setActiveTab] = useState<string>(Tabs.results[0].id);  
    const showExtraFilters = (
        activeTab === ContentType.USERS ||
        activeTab === ContentType.PAGES ||
        activeTab === ContentType.EVENTS ||
        activeTab === ContentType.POSTS
    );

    // ---------- Utils ----------
    const getContentTypeName = (id: string) =>
        ContentType.getList().find(c => c.id === id)?.name ?? "";

    const nullIfDefault = (v: string) =>
        v === CONSTANTS.SELECT_OPTION_VALUE ? null : v;

    const processSearchResults = (res: GetSearchResultFilteredRes) => {
        setPosts(res.posts?.map(Post.fromObject) ?? []);
        setUsers(res.users?.map(User.fromObject) ?? []);
        setPages(res.pageProfiles?.map(PageProfile.fromObject) ?? []);
        setEvents(res.events?.map(Event.fromObject) ?? []);
    };

    const buildSearchRequestDto = (): GetSearchResultFilteredReq => {
        const styleObj = styles.find(s => s.name === selectedStyle);
        const instrumentObj = instruments.find(i => i.name === selectedInstrument);
        const pageTypeObj = PageType.toOptionable(selectedPageType, pageTypes);
        const postTypeObj = PostType.toOptionable(selectedPostType, postTypes);

        const contentTypeId =
            contentTypes.find(c => c.name === getContentTypeName(activeTab))?.id ?? "";

        return {
            page: 1,
            size: 15,
            text: searchText,
            styles: styleObj?.id ? [styleObj.id] : [],
            instruments: instrumentObj?.id ? [instrumentObj.id] : [],
            pageTypeId: pageTypeObj?.id ?? "",
            postTypeId: postTypeObj?.id ?? "",
            contentTypeId,
            dateInit: dateInit ? new Date(dateInit) : undefined,
            dateEnd: dateEnd ? new Date(dateEnd) : undefined,
            session
        };
    };

    // ---------- Effects ----------
    useEffect(() => {
        if (error) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        const run = async () => {
            if (!activeTab || contentTypes.length === 0) {
                setPosts([]); setUsers([]); setPages([]); setEvents([]);
                return;
            }

            if (dateInit && dateEnd) {
                const start = new Date(dateInit);
                const end = new Date(dateEnd);
                if (start > end) {
                    setLoading(false); 
                    return;
                }
            }
            setLoading(true);
            setSearchAttempted(true);

            try {
                const req = buildSearchRequestDto();

                const res = await resultRepository.getSearchResult(req);
                processSearchResults(res);
            }
            catch (e) {
                toast.error(e instanceof Error ? e.message : Errors.UNKNOWN_ERROR);
            }
            finally {
                setLoading(false);
            }
        };

        run();
    }, [
        activeTab, selectedStyle, selectedInstrument, selectedPageType, selectedPostType,
        searchText, dateInit, dateEnd, session, contentTypes
    ]);

    useEffect(() => {
        if (!session) return;

        const loadCatalog = async () => {
            setLoading(true);
            try {
                if (userId) {
                    const response = await userRepository.getById({
                        session,
                        userId
                    } as GetUserByIdReq);
                    setUser(User.fromObject(response));
                }

                const [s, i, ct, pt, postT] = await Promise.all([
                    catalogRepository.getAllStyle(),
                    catalogRepository.getAllInstrument(),
                    catalogRepository.getAllContentType(),
                    catalogRepository.getAllPageType(),
                    catalogRepository.getAllPostType()
                ]);

                setStyles(s?.styles ?? []);
                setInstruments(i?.instruments ?? []);
                setContentTypes(ct?.contentTypes ?? []);
                setPageTypes(pt?.pageTypes ?? []);
                setPostTypes(postT?.postTypes ?? []);
            }
            catch (e) {
                toast.error(e instanceof Error ? e.message : Errors.UNKNOWN_ERROR);
            }
            finally {
                setLoading(false);
            }
        };

        loadCatalog();
    }, [session, catalogRepository]);

    // ---------- Handlers ----------
    const onTabClick = (tab: string) => {
        setActiveTab(tab);
        setSelectedStyle(null);
        setSelectedInstrument(null);
        setSelectedPageType(null);
        setSelectedPostType(null);
    };

    const handleStyleChange = (v: string) => setSelectedStyle(nullIfDefault(v));
    const handleInstrumentChange = (v: string) => setSelectedInstrument(nullIfDefault(v));
    const handlePageTypeChange = (v: string) => setSelectedPageType(nullIfDefault(v));
    const handlePostTypeChange = (v: string) => setSelectedPostType(nullIfDefault(v));
    const handleDateInitChange = (v: string) => setDateInit(nullIfDefault(v));
    const handleDateEndChange = (v: string) => setDateEnd(nullIfDefault(v));


    const handleVotePost = async (postId: string, voteType: Vote) => {
        try {
            const res = await postRepository.toggleVotes({
                session,
                voteType,
                postId
            } as TogglePostVotesReq);

            setPosts(prev =>
                prev.map(p => (p.id === postId ? Post.fromObject(res) : p))
            );
        }
        catch (e) {
            toast.error(e instanceof Error ? e.message : Errors.UNKNOWN_ERROR);
        }
    };

    const handleSearchChange = (text: string) => {
        if (!activeTab) {
            toast.error("Por favor, selecciona un tipo de contenido antes de buscar.");
            return;
        }
        setSearchText(text);
    };

    const toggleFollow = async (profile: Profile) => {
        try {
            await followRepository.toggleFollow({
                session,
                id: profile.id
            } as ToggleFollowReq);

            setUsers(prev => prev.map(u =>
                u.id === profile.id
                    ? User.fromObject({
                        ...u,
                        profile: {
                            ...u.profile,
                            isFollowing: !u.profile.isFollowing
                        }
                    })
                    : u
            ));

            setPages(prev => prev.map(p =>
                p.id === profile.id
                    ? PageProfile.fromObject({
                        ...p,
                        isFollowing: !p.isFollowing
                    })
                    : p
            ));

            toast.success(
                profile.isFollowing
                    ? `Dejaste de seguir a ${profile.displayName}`
                    : `Ahora sigues a ${profile.displayName}`
            );
        }
        catch (e) {
            toast.error(e instanceof Error ? e.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onClickOnPost = (id: string) => navigate(`/post-detail/${id}`);
    const onClickOnComments = onClickOnPost;
    const onClickOnEvent = (id: string) => navigate(`/event-detail/${id}`);

    const onClickOnProfile = (p: Profile) => {
        navigate(PrefixedUUID.resolveType(p.id) === EntityType.PAGE
            ? `/page/${p.id}`
            : `/user/${p.id}`);
    };

    const onClickOnAvatar = (post: Post) => {
        if (post.author?.id && !post.pageProfile?.id)
            navigate(`/user/${post.author.id}`);
        else if (post.pageProfile?.id)
            navigate(`/page/${post.pageProfile.id}`);
    };

    const onClickDelete = () => {
        // No implementado
    };

    const onLogout = async () => {
        try {
            await sessionRepository.deleteSession()

            toast.success("Sesión cerrada")
            navigate("/login", { replace: true})
        }
        catch (e) {
            toast.error("No se pudo cerrar sesión")
        }
    }

    const hasResults =
        posts.length > 0 ||
        users.length > 0 ||
        pages.length > 0 ||
        posts.length > 0 ||
        events.length > 0;

    const currentTabLength =
        activeTab === ContentType.POSTS ? posts.length :
        activeTab === ContentType.USERS ? users.length :
        activeTab === ContentType.PAGES ? pages.length :
        activeTab === ContentType.EVENTS ? events.length :
        0;

    const shouldShowEmpty =
        searchAttempted && (!hasResults || currentTabLength === 0);

    return {
        posts, users, pages, events,
        styles, instruments, pageTypes, postTypes,
        activeTab, searchText,
        selectedStyle, selectedInstrument, selectedPageType, selectedPostType,
        dateInit, dateEnd,
        loading, searchAttempted, hasResults, showExtraFilters,
        onTabClick,
        handleSearchChange,
        handleStyleChange,
        handleInstrumentChange,
        handlePageTypeChange,
        handlePostTypeChange,
        handleDateInitChange,
        handleDateEndChange,
        setDateInit,
        setDateEnd,
        handleVotePost,
        toggleFollow,
        onClickOnPost,
        onClickOnComments,
        onClickOnAvatar,
        onClickDelete,
        onClickOnProfile,
        onClickOnEvent,
        userId,
        user,
        onLogout,
        showFilters,
        toggleFilters,
        shouldShowEmpty
    };

}
