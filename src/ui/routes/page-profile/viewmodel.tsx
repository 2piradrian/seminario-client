import { useEffect, useMemo, useState } from "react";
import { Tabs, useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Vote, Errors, PageProfile, Post, User, type GetPageByIdReq, type TogglePostVotesReq, type DeletePostReq, type GetPostPageByProfileReq,Event,type GetEventAndAssistsPageReq,ContentType,Review,type GetPageReviewsByReviewedIdReq,type DeleteReviewReq,type DeleteEventReq,type ToggleFollowReq, type GetUserByIdReq, PostType} from "../../../domain";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewModel() {

    const navigate = useNavigate();

    const { id } = useParams();
    const { userId, session } = useSession();
    const { trigger } = useScrollLoading();
    
    const { followRepository, pageRepository, sessionRepository, postRepository, eventRepository, reviewRepository, userRepository, catalogRepository } = useRepositories();
    
    const [pageProfile, setPageProfile] = useState<PageProfile | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const [isFollowing] = useState(false);

    const [posts, setPosts] = useState<Post[]>([]);
    const [postPage, setPostPage] = useState<number | null>(1);
    const [postTypes, setPostTypes] = useState<PostType[]>([]);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

    const [activeTab, setActiveTab] = useState<string>(Tabs.content[0].id);

    const [events, setEvents] = useState<Event[]>([]);
    const [eventPage, setEventPage] = useState<number | null>(1);

    const [review, setReview] = useState<Review[]>([]);
    const [reviewPage, setReviewPage] = useState<number | null>(1);

    const [loading, setLoading] = useState(true);

    {/* ===== Main useEffects ===== */ }

    useEffect(() => {
        const fetchData = async () => {
            if (session != null) {
                setLoading(true);
                await fetchPageProfile();
                await fetchUser();
                await fetchPosts();
                await fetchEvents();
                await fetchReview();
                await fetchPostTypes();
                setLoading(false);
            }
        }
        fetchData().then();
    }, [session]);

    useEffect(() => {
        if (!session) return;

        if (activeTab === ContentType.POSTS) {
            if (postPage != null) {
                setPostPage(trigger);
                fetchPosts().then();
            }
        }
        else if (activeTab === ContentType.EVENTS) {
            if (eventPage != null) {
                setEventPage(trigger);
                fetchEvents().then();
            }
        }
        else if (activeTab === ContentType.REVIEWS) {
            if (reviewPage != null) {
                setReviewPage(trigger);
                fetchReview().then();
            }
        }
    }, [trigger, activeTab, session]);

    {/* ===== Fetch data ===== */ }


    const fetchReview = async () => {
        try {
            const reviewRes = await reviewRepository.getReviewsByReviewedId({
                userId: id,
                page: reviewPage,
                size: 15,
                session: session
            } as GetPageReviewsByReviewedIdReq);
            if (!reviewRes.nextPage) setReviewPage(null);

            if (reviewPage === 1) {
                setReview(reviewRes.reviews.map(Review.fromObject));
            }
            else {
                setReview(prevReview => [
                    ...prevReview,
                    ...reviewRes.reviews.map(Review.fromObject)
                ]);
            }
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR)
        }
    };

    const fetchUser = async () => {
        try {
            if (!userId) return;
            const response = await userRepository.getById({
                session,
                userId
            } as GetUserByIdReq);
            setUser(User.fromObject(response));
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

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

    const fetchPosts = async () => {
        try {
            const postsRes = await postRepository.getPostsByProfile(
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

    const fetchEvents = async () => {
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
    
    const fetchPostTypes = async () => {
        try {
            const response = await catalogRepository.getAllPostType();
            const postTypesFromRes = response.postTypes.map(pt => PostType.fromObject(pt));
            setPostTypes(postTypesFromRes);            
        } 
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    }

    {/* ===== onActions functions ===== */ }

    const onTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const onClickDelete = (itemId: string) => {
        setSelectedItemId(itemId)
        setIsDeleteOpen(true)
    };

    const onClickOnPost = (postId: string) => {
        navigate(`/post-detail/${postId}`);
    };

    const onClickOnEvent = (eventId: string) => {
        navigate(`/event-detail/${eventId}`);
    };

    const onClickOnComments = (postId: string) => {
        navigate(`/post-detail/${postId}`)
    };

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

    const onClickonAvatarReview = () => { };

    const onClickOnCreatePost = () => {
        navigate("/new-post");
    };

    const onClickOnCreateEvent = () => {
        navigate("/new-event");
    };

    const onClickOnCreateReview = () => {
        navigate(`/user/${id}/new-review`);
    };

    const onProfileClick = (profileId: string) => {
        navigate(`/user/${profileId}`);
    };

    const onClickEditPost = async (postId: string) => {
        navigate(`/edit-post/${postId}`)
    };

    const onClickEditPage = async () => {
        navigate(`/edit-page/${id}`)
    };

    const onClickEditEvent = async (eventId: string) => {
        navigate(`/edit-event/${eventId}`)
    };

    const onClickEditReview = async (reviewId: string) => {
        navigate(`/edit-review/${reviewId}`)
    };

    const onClickOnCalendar = () => {
        if (!pageProfile) return;
        navigate(`/user/${pageProfile.id}/assistance`)
    }

    const onLogout = async () => {
        try {
            await sessionRepository.deleteSession()

            toast.success("Sesión cerrada")
            navigate("/login", { replace: true })
        }
        catch (e) {
            toast.error("No se pudo cerrar sesión")
        }
    }

    {/* ===== variables ===== */ }

    const isMine = useMemo(() => {
        if (!pageProfile || !userId) return false
        return pageProfile.owner.id === userId
    }, [pageProfile, userId])


    {/* ===== handlers functions ===== */ }

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
        setSelectedItemId(null)
    };

    const proceedDelete = async () => {
        if (!selectedItemId) return;

        try {
            switch (activeTab) {

                case ContentType.POSTS:
                    await postRepository.delete({
                        session,
                        postId: selectedItemId
                    } as DeletePostReq);

                    setPosts(prev => prev.filter(post => post.id !== selectedItemId));
                    toast.success("Publicación borrada exitosamente");
                    break;

                case ContentType.EVENTS:
                    await eventRepository.delete({
                        session,
                        eventId: selectedItemId
                    } as DeleteEventReq);

                    setEvents(prev => prev.filter(event => event.id !== selectedItemId));
                    toast.success("Evento borrado exitosamente");
                    break;

                case ContentType.REVIEWS:
                    await reviewRepository.delete({
                        session,
                        id: selectedItemId
                    } as DeleteReviewReq);

                    setReview(prev => prev.filter(review => review.id !== selectedItemId));
                    toast.success("Reseña borrada exitosamente");
                    break;

                default:
                    toast.error("Tipo de contenido desconocido");
                    return;
            }

            setIsDeleteOpen(false);
            setSelectedItemId(null);
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
        const updated = {
            ...pageProfile,
            followersQuantity: pageProfile.followersQuantity + quantity,
            isFollowing: follow
        };
        setPageProfile(PageProfile.fromObject(updated));
    }

    return {
        loading,
        toggleFollow,
        isFollowing,
        pageProfile,
        user,
        trigger,
        onFollowersClick,
        onClickOnComments,
        handleVotePost,
        onClickDelete,
        posts,
        events,
        review,
        isMine,
        cancelDelete,
        proceedDelete,
        isDeleteOpen,
        onClickOnPost,
        onClickOnEvent,
        onClickOnMember,
        onClickOnAvatarItem,
        onClickonAvatarReview,
        onClickOnCreateEvent,
        onClickOnCreatePost,
        onClickOnCreateReview,
        onProfileClick,
        activeTab,
        onTabClick,
        onClickOnCalendar,
        onClickEditPost,
        onClickEditEvent,
        onClickEditReview,
        onClickEditPage,
        onLogout,
        postTypes
    };
}
