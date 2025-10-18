import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import { Errors, Instrument, PageProfile, Post, Style, Vote, type GetAllInstrumentRes, type GetAllStyleRes, type GetSearchResultFilteredReq, type GetSearchResultFilteredRes, type ToggleFollowReq, type TogglePostVotesReq, type UserProfile } from "../../../domain";
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
    const [searchText, setSearchText] = useState<string>("");

    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const [selectedInstrument, setSelectedInstrument] = useState<string | null>(null);

    const [posts, setPosts] = useState<Post[]>([]);
    const [profiles, setProfiles] = useState<UserProfile[]>([]);
    const [pages, setPages] = useState<PageProfile[]>([]);

    const [styleNames, setStyleNames] = useState<string[]>([]);
    const [instrumentNames, setInstrumentNames] = useState<string[]>([]);
    const [contentTypeNames, setContentTypeNames] = useState<string[]>([]);
    const showExtraFilters = selectedType === 'Usuarios' || selectedType === 'Páginas';


    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const searchData = async () => {

            if (!selectedType || selectedType === "Seleccionar") {
                return;
            }

            try {
                const contentTypeObject = contentTypes.find(ct => ct.name === selectedType);
                const pageTypeId = contentTypeObject ? contentTypeObject.id : null;
                if (!pageTypeId) return;

                const styleObject = styles.find(s => s.name === selectedStyle);
                const stylesParam = styleObject ? [styleObject] : [];

                const instrumentObject = instruments.find(i => i.name === selectedInstrument);
                const instrumentsParam = instrumentObject ? [instrumentObject] : [];

                const requestDto: GetSearchResultFilteredReq = {
                    page: 1, 
                    size: 15,
                    name: searchText || '',
                    styles: stylesParam,
                    instruments: instrumentsParam,
                    ids: [], 
                    pageTypeId: pageTypeId,
                    session: session
                    
                };
                const response: GetSearchResultFilteredRes = await resultRepository.getSearchResult(requestDto);
                setPosts(response.posts ? response.posts.map(p => Post.fromObject(p)) : []);
                setProfiles(response.userProfiles || []);
                setPages(response.pagesProfiles || []);
                console.log(response)
            } catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
        };
        searchData();
    }, [selectedType, selectedStyle, selectedInstrument, searchText, session]);

    useEffect(() => {
        const fetchCatalog = async () => {
                try {
                    const stylesResponse: GetAllStyleRes = await catalogRepository.getAllStyle();
                    const instrumentsResponse: GetAllInstrumentRes = await catalogRepository.getAllInstrument();
                    const contentTypeResponse: GetAllContentTypeRes = await catalogRepository.getAllContentType();

                    if (stylesResponse) {
                        setStyles([...stylesResponse.styles]);
                        setStyleNames(stylesResponse.styles.map(s=> s.name));
                    }
                    if (instrumentsResponse) {
                        setInstruments([...instrumentsResponse.instruments]);
                        setInstrumentNames(instrumentsResponse.instruments.map(i=> i.name));
                    }
                    if (contentTypeResponse) {
                        setContentTypes([...contentTypeResponse.contentTypes]);
                        setContentTypeNames(contentTypeResponse.contentTypes.map(ct=> ct.name));
                    }   
                }
                catch (error) {
                    toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
                }
            };

            if(session) {
                fetchCatalog();
            }
    }, [session]);
        
    const handleTypeChange = (value: string) => {
            setSelectedType(value);
            setSelectedStyle(null);
            setSelectedInstrument(null);
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
        } catch (error) {
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
    const searchAttempted = selectedType && selectedType !== "Seleccionar";
    const hasResults =
        (selectedType === "Posts" && posts.length > 0) ||
        (selectedType === "Usuarios" && profiles.length > 0) ||
        (selectedType === "Páginas" && pages.length > 0);
         

    return {
        styles: styleNames,
        instruments: instrumentNames,
        contentTypes: contentTypeNames,
        handleTypeChange,
        handleStyleChange,
        handleInstrumentChange,

        selectedStyle,
        selectedType,
        selectedInstrument,

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
        toggleFollow
    };
}
