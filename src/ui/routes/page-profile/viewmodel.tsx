import { useEffect, useMemo, useState } from "react";
import { useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Vote, Errors, PageProfile, Post, UserProfile, type GetPageByIdReq, type TogglePostVotesReq, type DeletePostReq, 
    type GetPostPageByProfileReq, 
    type ToggleFollowReq,
    Event,
    type GetEventAndAssistsPageReq} from "../../../domain";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewModel() {
    
    const navigate = useNavigate();

    const { id } = useParams();
    const { userId, session } = useSession();
    const { trigger } = useScrollLoading();
    const { followRepository, pageRepository, postRepository, eventRepository } = useRepositories();

    const [pageProfile, setPageProfile] = useState<PageProfile | null>(null);
    const [profile] = useState<UserProfile | null>(null);

    const [isFollowing] = useState(false);

    const [posts, setPosts] = useState<Post[]>([]);
    const [postPage, setPostPage] = useState<number | null>(1);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null)

    const [tabs] = useState(["Posts", "Eventos"]);
    const [activeTab, setActiveTab] = useState("Posts");

    const [events, setEvents] = useState<Event[]>([]);
    const [eventPage, setEventPage] = useState<number | null>(1);
    

    useEffect(() => {
        const fetchData = async () => {
            if (session != null){
                await fetchPageProfile();
                await fetchPosts();
                await fetchEvents();
            }
        }
        fetchData().then();
    }, [session]);

    useEffect(() => {
        if (!session) return;

        if (activeTab === "Posts") {
        if (postPage != null) {
            setPostPage(trigger);
            fetchPosts().then();
        }
        } 
        else if (activeTab === "Eventos") {
        if (eventPage != null) {
            setEventPage(trigger);
            fetchEvents().then();
        }
        }
        
    }, [trigger, activeTab, session]);

    const onTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const isMine = useMemo(() => {
        if (!profile || !userId) return false
        return profile.id === userId
    }, [profile, userId])    

    const fetchPageProfile = async () => {
        try {
            const profile = await pageRepository.getById({
                pageId: id,
                session: session
            } as GetPageByIdReq);
            
            const pageProfile = PageProfile.fromObject(profile);
            setPageProfile(pageProfile);
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchPosts = async() => {
        try {
            const postsRes = await postRepository.getPostPageByProfile(
                { session: session, page: postPage, size: 15, profileId: id } as GetPostPageByProfileReq
            );

            if (!postsRes.nextPage) setPostPage(null);
            
            if (postPage === 1) {
                setPosts(postsRes.posts.map(Post.fromObject));
            }
            else {
                setPosts(prevPosts => [
                    ...prevPosts,
                    ...postsRes.posts
                    .filter(post => post.pageProfile)
                    .map(post => Post.fromObject(post))
                ]);
            }             
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR)
        }
    };

    const fetchEvents = async() => {
        try {
            const eventsRes = await eventRepository.getEventAndAssistsPage(
                { session: session, page: eventPage, size: 15, userId: id } as GetEventAndAssistsPageReq
            );
            if (!eventsRes.nextPage) setEventPage(null);

            if (eventPage === 1) {
                setEvents(eventsRes.events.map(Event.fromObject));
            }
            else {
                setEvents(prevEvents => [
                    ...prevEvents,
                    ...eventsRes.events
                    .filter(event => event.pageProfile)
                    .map(event => Event.fromObject(event))
                ]);
            }
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR)
        }
    };

    const handleVotePost = async (postId: string, voteType: Vote) => {
        try {
            const response = await postRepository.toggleVotes({
                session: session,
                voteType: voteType,
                postId: postId,
            } as TogglePostVotesReq)

            const updatedPost = Post.fromObject(response);

            setPosts(prevPosts =>
                prevPosts.map(post => (post.id === postId ? updatedPost : post))
            );
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const cancelDelete = () => {
        setIsDeleteOpen(false)
        setSelectedPostId(null)
    };

    const proceedDelete = async () => {
        if (!selectedPostId) return
        try {
            await postRepository.delete({
                session: session,
                postId: selectedPostId
            } as DeletePostReq);
            
            setPosts(prev => prev.filter(post => post.id !== selectedPostId))
            
            toast.success("Post borrado exitosamente")
            
            setIsDeleteOpen(false)
            setSelectedPostId(null)
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onClickOnPost = (postId: string) => {
        if (!profile) return;
        navigate(`/post-detail/${postId}`);
    };

    const onClickOnEvent = (eventId: string) => {
        if (!profile) return;
        navigate(`/event-detail/${eventId}`);
    };

    const onClickOnComments = (postId: string) => {
        if (!profile) return;
        navigate(`/post-detail/${postId}`)
    };
    
    const toggleFollow = async () => {
        try {
            await followRepository.toggleFollow({
                session: session,
                id: id
            } as ToggleFollowReq);
            if (pageProfile.isFollowing) {
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
        const updated: PageProfile = {
            ...pageProfile,
            followersQuantity: pageProfile.followersQuantity + quantity,
            isFollowing: follow
        };
        setPageProfile(updated);
    }

    const onFollowersClick = () => {
        if (!pageProfile) return;
        navigate(`/user/${pageProfile.id}/followers`);
    };

    const onClickOnMember = (profileId: string) => {
        navigate(`/user/${profileId}`);
    };

    const onClickOnAvatarItem = (item: Post | Event) => {
        if (!item || !item.author) return;
        const pageId = item.pageProfile?.id;
        if (!pageId) return;
        navigate(`/page/${pageId}`);
    };
    const onClickOnCreatePost = () => {
        navigate("/new-post");
    };
    
    const onClickOnCreateEvent = () => {
        navigate("/new-event");
    };

    const onProfileClick = (profileId: string) => {
        navigate(`/user/${profileId}`);
    };

    const onClickEditPost = () => {
    }

    const onClickEditEvent = () => {

    }
    const onClickDelete = () => {}; // TO DO: Delete page-profile

    return {
        toggleFollow,
        isFollowing,
        pageProfile,
        trigger,
        onFollowersClick,
        onClickOnComments,
        handleVotePost,
        onClickDelete,
        posts,
        events,
        isMine,
        cancelDelete,
        proceedDelete,
        isDeleteOpen,
        onClickOnPost,
        onClickOnEvent, 
        onClickOnMember,
        onClickOnAvatarItem,
        onClickOnCreateEvent,
        onClickOnCreatePost,
        onProfileClick,
        tabs, 
        activeTab,
        onTabClick
    };
}