import useSession from "../../hooks/useSession.tsx";
import { Tabs, useRepositories } from "../../../core";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContentType, type DeletePostReq, Errors, Event, type GetEventAndAssistsPageReq, type GetPostPageByProfileReq, type GetUserByIdReq, Post, Review, type ToggleFollowReq, type TogglePostVotesReq, User, UserProfile, Vote, type DeleteEventReq, type DeleteReviewReq, PageProfile, type GetPageByUserIdReq, Role, PostType, type CancelEventReq, type CreateReviewReq, type UpdateReviewReq, type BanUserReq, ModerationReason } from "../../../domain";
import { useScrollLoading } from "../../hooks/useScrollLoading.tsx";
import toast from "react-hot-toast";
import type { GetPageReviewsByReviewedIdReq } from "../../../domain/dto/review/request/GetPageReviewsByReviewedIdReq.ts";

export default function ViewModel() {

    const navigate = useNavigate();

    const { id } = useParams();
    const { userRepository, pageRepository, sessionRepository, followRepository, postRepository, eventRepository, reviewRepository, catalogRepository, bannedUserRepository } = useRepositories();
    const { userId, session } = useSession();
    const { trigger, } = useScrollLoading();

    const [userPages, setUserPages] = useState<PageProfile[]>([]);

    const [posts, setPosts] = useState<Post[]>([]);
    const [postPage, setPostPage] = useState<number | null>(1);
    const [postTypes, setPostTypes] = useState<PostType[]>([]);

    const [user, setUser] = useState<User | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isCancelOpen, setIsCancelOpen] = useState(false)
    const [isBanUserOpen, setIsBanUserOpen] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState<string>(Tabs.content[0].id);

    const [events, setEvents] = useState<Event[]>([]);
    const [eventPage, setEventPage] = useState<number | null>(1);

    const [review, setReview] = useState<Review[]>([]);
    const [reviewPage, setReviewPage] = useState<number | null>(1);
    const [newReviewRating, setNewReviewRating] = useState(0);
    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [editingRating, setEditingRating] = useState<number>(0);
    const [moderationReasons, setModerationReasons] = useState<ModerationReason[]>([]);
    const [selectedModerationReason, setSelectedModerationReason] = useState<string>("Seleccionar");

    const currentUserId = userId;

    {/* ===== Main useEffects ===== */ }

    useEffect(() => {
        fetchData().then();
    }, [session, id, activeTab]);

    useEffect(() => {
        if (!session) return;
        fetchModerationReasons().then();
    }, [session]);

    useEffect(() => {
        if (!session) return;

        if (activeTab === ContentType.POSTS) {
            if (postPage != null && trigger > 1) {
                setPostPage(trigger);
                fetchPosts(trigger).then();
            }
        }
        else if (activeTab === ContentType.EVENTS) {
            if (eventPage != null && trigger > 1) {
                setEventPage(trigger);
                fetchEvents(trigger).then();
            }
        }
        else if (activeTab === ContentType.REVIEWS) {
            if (reviewPage != null && trigger > 1) {
                setReviewPage(trigger);
                fetchReview(trigger).then();
            }
        }

    }, [trigger, activeTab, session]);

    {/* ===== Fetch data ===== */ }

    const fetchData = async () => {
        if (!id) {
            navigate("/error-404");
            return;
        }

        setPostPage(1);
        setEventPage(1);
        setReviewPage(1);
        setPosts([]);
        setEvents([]);
        setReview([]);

        if (session) 
            {
            await fetchCurrentUser();
            await fetchUser();
            await fetchPostTypes();
            await fetchUserPages();
            if (activeTab === ContentType.POSTS) {
                await fetchPosts(1);
            } else if (activeTab === ContentType.EVENTS) {
                await fetchEvents(1);
            } else if (activeTab === ContentType.REVIEWS) {
                await fetchReview(1);
            }
        }
    }

    const fetchUser = async () => {
        try {
            const response = await userRepository.getById({
                session: session,
                userId: id
            } as GetUserByIdReq);

            const user = User.fromObject(response);
            
            setUser(user);

        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : Errors.UNKNOWN_ERROR;

            if (errorMessage === "User not found") {
                navigate("/error-404");
                return;
            }
            toast.error(errorMessage);
        }
    };

    const fetchUserPages = async () => {
        try {

            const response = await pageRepository.getByUserId({
                userId: id,
                session: session
            } as GetPageByUserIdReq);

            const pagesProfiles = response.pages.map(p => PageProfile.fromObject(p));

            setUserPages(pagesProfiles);
        }
        catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchCurrentUser = async () => {
        try {
            if (!userId) return;
            const response = await userRepository.getById({
                session,
                userId
            } as GetUserByIdReq);
            setCurrentUser(User.fromObject(response));
        }
        catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchPosts = async (page?: number | null) => {
        const pageToLoad = page ?? postPage ?? 1;
        if (!pageToLoad) return;

        try {
            const postsRes = await postRepository.getPostsByProfile(
                { session: session, page: pageToLoad, size: 15, profileId: id } as GetPostPageByProfileReq
            );
            if (!postsRes.nextPage) setPostPage(null);

            if (pageToLoad === 1) {
                setPosts(postsRes.posts.map(Post.fromObject));
            }
            else {
                setPosts(prevPosts => [
                    ...prevPosts,
                    ...postsRes.posts.map(Post.fromObject)
                ]);
            }
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR)
        }
    };

    const fetchEvents = async (page?: number | null) => {
        const pageToLoad = page ?? eventPage ?? 1;
        if (!pageToLoad) return;

        try {
            const eventsRes = await eventRepository.getEventAndAssistsPage(
                { session: session, page: pageToLoad, size: 15, userId: id } as GetEventAndAssistsPageReq
            );
            if (!eventsRes.nextPage) setEventPage(null);

            if (pageToLoad === 1) {
                setEvents(eventsRes.events.map(Event.fromObject));
            }
            else {
                setEvents(prevEvents => [
                    ...prevEvents,
                    ...eventsRes.events.map(Event.fromObject)
                ]);
            }
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR)
        }
    };

    const fetchReview = async (page?: number | null) => {
        const pageToLoad = page ?? reviewPage ?? 1;
        if (!pageToLoad) return;

        try {
            const reviewRes = await reviewRepository.getReviewsByReviewedId({
                userId: id,
                page: pageToLoad,
                size: 15,
                session: session
            } as GetPageReviewsByReviewedIdReq);

            if (!reviewRes.nextPage) setReviewPage(null);

            if (pageToLoad === 1) {
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

    const fetchModerationReasons = async () => {
        try {
            const response = await catalogRepository.getAllModerationReason();
            const reasonsFromRes = response.moderationReasons.map(r => ModerationReason.fromObject(r));
            setModerationReasons(reasonsFromRes);
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    }

    const onSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            if (!id) return;
            const formData = new FormData(e.currentTarget);
            const form = Object.fromEntries(formData) as {
                review?: string;
            }

            await reviewRepository.create({
                session: session,
                reviewedUserId: id,
                review: form.review,
                rating: newReviewRating,
            } as CreateReviewReq);

            toast.success("Reseña creada correctamente");

            setNewReviewRating(0);

            setReviewPage(1);
            await fetchReview(1); 

        } catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onEditReview = async (e: React.FormEvent<HTMLFormElement>) => {
        try{
            e.preventDefault();

            if (!editingReview) return;
            const formData = new FormData(e.currentTarget);
            const form = Object.fromEntries(formData) as { review?: string };

            const dto: UpdateReviewReq = {
                session: session,
                reviewId: editingReview.id,
                review: form.review,
                rating: editingRating,
            };

            await reviewRepository.update(dto);

            setReview(prevReviews => prevReviews.map(r => 
                r.id === editingReview.id 
                ? { ...r, review: dto.review || r.review, rating: dto.rating } as Review
                : r
            ));

            toast.success("Reseña actualizada correctamente");
            cancelEditReview();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    {/* ===== onActions functions ===== */ }

    const onTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const onClickOnReview = (reviewId: string) => {
        if (!user) return;
        navigate(`/edit-review/${reviewId}`);
    };

    const onClickEditReview = (reviewToEdit: Review) => {
        setEditingReview(reviewToEdit);
        setEditingRating(reviewToEdit.rating);
        setActiveMenuId(null);
    };

    const cancelEditReview = () => {
        setEditingReview(null);
        setEditingRating(0);
    };

    const onEditingRatingChange = (rating: number) => {
        setEditingRating(rating);
    };

    const onClickOnPost = (postId: string) => {
        if (!user) return;
        navigate(`/post-detail/${postId}`);
    };

    const onClickOnPage = (pageId: string) => {
        if (!user) return;
        navigate(`/page/${pageId}`);
    };

    const onClickOnEvent = (eventId: string) => {
        if (!user) return;
        navigate(`/event-detail/${eventId}`);
    };

    const onClickOnComments = (postId: string) => {
        if (!user) return;
        navigate(`/post-detail/${postId}`)
    };

    const onReviewRatingChange = (value: number) => {
        setNewReviewRating(value);
    };

    const onClickEditPost = async (postId: string) => {
        navigate(`/edit-post/${postId}`)
    };

    const onClickEditEvent = async (eventId: string) => {
        navigate(`/edit-event/${eventId}`)
    };

    const onClickonAvatarReview = (review: Review) => {
        navigate(`/user/${review.reviewerUser.id}`);
    };

    const onClickOnAvatarItem = (item: Post | Event | Review) => {
        const pageId = (item as Post | Event)?.pageProfile?.id;
        if (pageId) {
            navigate(`/page/${pageId}`);
            return;
        }

        const userId = (item as Review)?.reviewerUser?.id ?? (item as Post | Event)?.author?.id;
        if (userId) navigate(`/user/${userId}`);
    };

    const onClickDelete = (itemId: string) => {
        setSelectedItemId(itemId);
        setIsDeleteOpen(true);
    };

    const onClickCancel = (eventId: string) => {
        setSelectedItemId(eventId);
        setIsCancelOpen(true);
    };

    const cancelDelete = () => {
        setIsDeleteOpen(false);
        setSelectedItemId(null);
    };

    const closeMenu = () => setActiveMenuId(null);

    const cancelCancelEvent = () => {
        setIsCancelOpen(false)
    };

    const onClickOnBanUser = () => {
        setIsBanUserOpen(true);
    };

    const cancelBanUser = () => {
        setIsBanUserOpen(false);
    };

    const proceedBanUser = async () => {
        if (!session || !id) return;
        const reason = moderationReasons.find(r => r.name === selectedModerationReason);
        if (!reason) {
            toast.error("Selecciona un motivo de baneo");
            return;
        }

        try {
            const dto: BanUserReq = {
                session,
                userId: id,
                reasonId: reason.id
            };

            await bannedUserRepository.ban(dto);
            toast.success("Usuario baneado correctamente");
            setIsBanUserOpen(false);
            setSelectedModerationReason("Seleccionar");
        } catch (error) {
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

    const onClickOnCreateEvent = () => {
        navigate("/new-event");
    };

    const onClickOnEditProfile = () => {
        navigate("/profile/edit");
    };

    const onClickOnCalendar = () => {
        if (!user) return;
        navigate(`/user/${id}/assistance`)
    };

    const onClickOnChat = () => {
        if (!user) return;
        navigate(`/chat/${id}`)
    };

    const onLogout = async () => {
        try {
            await sessionRepository.deleteSession()

            toast.success("Sesión cerrada")
            navigate("/login", { replace: true })
        }
        catch (e) {
            toast.error("No se pudo cerrar sesión")
        }
    };

    {/* ===== variables ===== */ }

    const isMine = useMemo(() => {
        if (!user || !userId) return false
        return user.id === userId
    }, [user, userId])

    const isAdminOrMod = useMemo(() => {
        return currentUser?.role === Role.ADMIN || currentUser?.role === Role.MODERATOR;
    }, [currentUser]);

    const isAdmin = useMemo(() => {
        return currentUser?.role === Role.ADMIN;
    }, [currentUser]);

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

    
    const handleSharePost = async (postId: string) => {
            if (!postId) return;
    
            const url = `${window.location.origin}/post-detail/${postId}`;
    
            try {
                await navigator.clipboard.writeText(url);
                
                toast.success("¡Enlace copiado al portapapeles!");
            } catch (error) {
                toast.error("No se pudo copiar el enlace");
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

        setUser({ ...user, profile: UserProfile.fromObject(updated) } as User);
    }
    
    const toggleMenu = (id: string) => {
        if (activeMenuId === id) {
            setActiveMenuId(null);
        } else {
            setActiveMenuId(id);
        }
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

    const proceedCancel = async () => {
        const eventId = selectedItemId;

        if (!eventId) {
            toast.error("No se pudo identificar el evento a cancelar");
            return;
        }

        try {
            await eventRepository.cancel({
                session: session,
                eventId,
            } as CancelEventReq);

            toast.success("Evento Cancelado exitosamente");

            setIsDeleteOpen(false);
            setSelectedItemId(null);
        }

        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    return {
        toggleFollow,
        toggleMenu,
        activeMenuId,
        closeMenu,
        user,
        userPages,
        onFollowersClick,
        onFollowingClick,
        onClickOnComments,
        onClickOnAvatarItem,
        onClickDelete,
        onClickCancel,
        onClickOnPage,
        handleVotePost,
        posts,
        events,
        review,
        onClickOnPost,
        onClickOnEvent,
        isMine,
        isAdminOrMod,
        cancelDelete,
        cancelCancelEvent,
        proceedDelete,
        proceedCancel,
        isDeleteOpen,
        isCancelOpen,
        onClickOnCreatePage,
        onClickOnCreatePost,
        onClickOnCreateEvent,
        onClickOnEditProfile,
        onClickEditPost,
        onClickEditEvent,
        onClickonAvatarReview,
        activeTab,
        onTabClick,
        onClickOnCalendar,
        onClickOnReview,
        currentUserId,
        currentUser,
        onClickOnChat,
        onLogout,
        postTypes,
        newReviewRating,
        onReviewRatingChange,
        onSubmitReview,
        handleSharePost,
        isAdmin,
        onClickOnBanUser,
        cancelBanUser,
        proceedBanUser,
        isBanUserOpen,
        moderationReasons,
        selectedModerationReason,
        setSelectedModerationReason,

        onClickEditReview,
        cancelEditReview,
        onEditReview,
        editingRating,
        editingReview,
        onEditingRatingChange
        };
}
