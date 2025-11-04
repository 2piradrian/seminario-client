import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Errors, Post, Vote, Review, Event, type TogglePostVotesReq, type DeletePostReq, type GetUserByIdReq, User, type GetPostPageByProfileReq, type GetEventAndAssistsPageReq, type GetReviewsByAuthorReq } from "../../../domain";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";
import type { GetPageReviewsByReviewedIdReq } from "../../../domain/dto/review/request/GetPageReviewsByReviewedIdReq.ts";

export default function ViewModel() {

    const navigate = useNavigate();
    
    const { userId, session } = useSession();
    const { trigger } = useScrollLoading();
    const { userRepository, postRepository, eventRepository, reviewRepository } = useRepositories();

    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [postPage, setPostPage] = useState<number | null>(1);
    const [events, setEvents] = useState<Event[]>([]);
    const [eventPage, setEventPage] = useState<number | null>(1);
    const [review, setReview] = useState<Review[]>([]);
    const [reviewPage, setReviewPage] = useState<number | null>(1);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
    const TABS = ["Posts", "Eventos", "Reseñas"];
    const [activeTab, setActiveTab] = useState(TABS[0]);

    useEffect(() => {
        const fetchData = async () => {
            if (session != null){
                await fetchUser().then();
                await fetchPosts().then();
                await fetchEvents().then();
                await fetchEvents().then();
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
    else if (activeTab === "Reseñas") {
        if (reviewPage != null) {
            setReviewPage(trigger);
            fetchReview().then();
        }
    }
    
  }, [trigger, activeTab, session]);

    const isMine = useMemo(() => {
        if (!user || !userId) return false
        return user.id === userId
    }, [user, userId])
    
    const fetchPosts = async() => {
        try {
            const postsRes = await postRepository.getPostPageByProfile(
                { session: session, page: postPage, size: 15, profileId: userId } as GetPostPageByProfileReq
            );
            if (!postsRes.nextPage) setPostPage(null);
            
            if (postPage === 1) {
                setPosts(postsRes.posts.map(Post.fromObject));
            }
            else {
                setPosts(prevPosts => [
                    ...prevPosts,
                    ...postsRes.posts
                    .filter(post => post.author?.id === userId)
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
                { session: session, page: eventPage, size: 15, userId: userId } as GetEventAndAssistsPageReq
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

    const fetchReview = async () => {
        try {
            const reviewRes = await reviewRepository.getPageReviewsByReviewedId({
                userId: userId,
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
                    ...reviewRes.reviews.map(review => Review.fromObject(review))
                ]);
            }
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR)
        }
    };

    const fetchUser = async () => {
        try {
            const response = await userRepository.getUserById({
                session: session,
                userId: userId!
            } as GetUserByIdReq);

            if (response) setUser(User.fromObject(response));
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const goToEditProfile = () => {
        navigate("/profile/edit");
    };

    const onClickOnCreatePost = () => {
        navigate("/new-post");
    };
    
    const onClickOnCreateEvent = () => {
        navigate("/new-event");
    };
    
    const onClickOnCreateReview = () => { 
        navigate("/new-review");
    };

    const onClickOnCreatePage = () => {
        navigate("/new-page");
    };

    const onClickOnPost = (postId: string) => {
        if (!user) return;
        navigate(`/post-detail/${postId}`);
    };

    const onClickOnEvent = (eventId: string) => {
        if (!user) return;
        navigate(`/event-detail/${eventId}`);
    };

    const onClickOnReview = (reviewId: string) => {
        if (!user) return;
        navigate(`/review-detail/${reviewId}`);
    };

    const onClickOnComments = (postId: string) => {
        if (!user) return;
        navigate(`/post-detail/${postId}`)
    };
    
    const onClickOnAvatarItem = (item: Post | Event | Review) => {
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

    const onClickEditPost = async (postId: string) => {
        navigate(`/edit-post/${postId}`)
    };

    const onClickEditEvent = async(eventId: string) => {
        navigate(`/edit-event/${eventId}`)
    };

     const onClickEditReview = async(reviewId: string) => {
        navigate(`/edit-review/${reviewId}`)
    };

    const onProfileClick = (profileId: string) => {
        navigate(`/user/${profileId}`);
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

    const onFollowersClick = () => {
        if (!user) return;
        navigate(`/user/${user.id}/followers`);
    };

    const onFollowingClick = () => {
        if (!user) return;
        navigate(`/user/${user.id}/following`);
    };

    return {
        goToEditProfile,
        tabs: TABS,
        activeTab,
        onClickOnEvent,
        onTabClick: setActiveTab,
        user,
        onProfileClick,
        onClickOnComments,
        onClickOnAvatarItem,
        onClickDelete,
        handleVotePost,
        posts,
        events,
        review,
        onClickOnReview,
        onClickOnPost,
        isMine,
        cancelDelete,
        proceedDelete,
        isDeleteOpen,
        onFollowersClick,
        onFollowingClick,
        onClickOnCreateEvent,
        onClickOnCreateReview,
        onClickOnCreatePost,
        onClickOnCreatePage,
        onClickEditPost,
        onClickEditEvent,
        onClickEditReview
    };
}
