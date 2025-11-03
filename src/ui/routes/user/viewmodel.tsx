import useSession from "../../hooks/useSession.tsx";
import { useRepositories } from "../../../core";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type DeletePostReq, Errors, type GetEventAndAssistsPageReq, type GetPostPageByProfileReq, type GetUserByIdReq, Post, type ToggleFollowReq, type TogglePostVotesReq, User, Event, UserProfile, Vote } from "../../../domain";
import { useScrollLoading } from "../../hooks/useScrollLoading.tsx";
import toast from "react-hot-toast";

export default function ViewModel() {

    const navigate = useNavigate();

    const { id } = useParams();
    const { userRepository, followRepository, postRepository, eventRepository } = useRepositories();
    const { userId, session } = useSession();
    const { trigger } = useScrollLoading();
    

    const [posts, setPosts] = useState<Post[]>([]);
    const [postPage, setPostPage] = useState<number | null>(1);

    const [user, setUser] = useState<User | null>(null);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null)

    const [tabs] = useState(["Posts", "Eventos"]);
    const [activeTab, setActiveTab] = useState("Posts");

    const [events, setEvents] = useState<Event[]>([]);
    const [eventPage, setEventPage] = useState<number | null>(1);
    
    useEffect(() => {
        const fetchData = async () => {
            if (!id) navigate("/error-404");
            if (session) { 
                await fetchUser();
                if (activeTab === "Posts") {
                    await fetchPosts();
                } else {
                    await fetchEvents();
                }
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
            if (!user || !userId) return false
            return user.id === userId
        }, [user, userId])

    const fetchUser = async () => {
        try {
            const response = await userRepository.getUserById({
                session: session,
                userId: id
            } as GetUserByIdReq);

            setUser(User.fromObject(response));
        }
        catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchPosts = async() => {
        try {
            const postsRes = await postRepository.getPostPageByProfile(
                { session: session, page: postPage, size: 15, profileId: id } as GetPostPageByProfileReq
            );

            if (!postsRes.nextPage) setPostPage(null);
            
            if (postPage === 1) {
                setPosts(postsRes.posts
                    .filter(post => !post.pageProfile.id)
                    .map(Post.fromObject));
            }
            else {
                setPosts(prevPosts => [
                    ...prevPosts,
                    ...postsRes.posts
                    .filter(post => !post.pageProfile.id)
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
                    ...eventsRes.events.map(event => Event.fromObject(event))
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

    const toggleFollow = async () => {
        try {
            await followRepository.toggleFollow({
                session: session,
                id: id
            } as ToggleFollowReq);

            if (user.profile.isFollowing) {
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
        const updated = {
            ...user.profile,
            followersQuantity: user.profile.followersQuantity + quantity,
            isFollowing: follow
        };

        setUser({...user, profile: UserProfile.fromObject(updated)} as User);
    }

    const onClickOnPost = (postId: string) => {
        if (!user) return;
        navigate(`/post-detail/${postId}`);
    };

    const onClickOnEvent = (eventId: string) => {
        if (!user) return;
        navigate(`/event-detail/${eventId}`);
    };

    const onClickOnComments = (postId: string) => {
        if (!user) return;
        navigate(`/post-detail/${postId}`)
    };
    
    const onClickOnAvatarItem = (item: Post | Event) => {
        if (!item || !item.author) return;
        const pageId = item.pageProfile?.id;
        if (!pageId) return;
        navigate(`/page/${pageId}`);
    };

    const onClickDelete = (postId: string) => {
        setSelectedPostId(postId)
        setIsDeleteOpen(true)
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

    const onFollowersClick = () => {
        if (!user) return;
        navigate(`/user/${user.id}/followers`);
    };

    const onFollowingClick = () => {
        if (!user) return;
        navigate(`/user/${user.id}/following`);
    };

    const onClickOnCreatePost = () => {
        if (!userId) return;
        navigate("/new-post");
    };

    const onClickOnCreatePage = () => {
        if (!userId) return;
        navigate("/new-page");
    };

    const onClickOnEditProfile = () => {
        navigate("/profile/edit");
    };

    return {
        toggleFollow,
        user,
        onFollowersClick,
        onFollowingClick,
        onClickOnComments,
        onClickOnAvatarItem,
        onClickDelete,
        handleVotePost,
        posts,
        events,
        onClickOnPost,
        onClickOnEvent,
        isMine,
        cancelDelete,
        proceedDelete,
        isDeleteOpen,
        onClickOnCreatePage,
        onClickOnCreatePost,
        onClickOnEditProfile,
        tabs,
        activeTab,
        onTabClick
    };
}
