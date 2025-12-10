import { useNavigate } from "react-router-dom";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import useSession from "../../hooks/useSession";
import { useEffect, useState } from "react";
import { useRepositories } from "../../../core";
import { Errors, Event, Post, User, Vote, type GetSearchResultFilteredReq, type GetUserByIdReq, type TogglePostVotesReq } from "../../../domain";
import toast from "react-hot-toast";

export default function ViewModel() {
    const navigate = useNavigate();

    const { trigger } = useScrollLoading();
    const { userId, session } = useSession();
    const { userRepository, resultRepository, postRepository, sessionRepository } = useRepositories();

    const [posts, setPosts] = useState<Post[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [postPage, setPostPage] = useState<number>(1);
    const [eventsPage, setEventsPage] = useState<number>(1);
    const [canScroll, setCanScroll] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (session != null && userId != null) {
                await fetchProfile();
                await fetchPosts();
                await fetchEvents();
            }
        }
        fetchData().then();
    }, [session]);

    useEffect(() => {
        if (canScroll && session != null) {
            fetchPosts().then();
            fetchEvents().then()
        }
    }, [trigger]);

    const fetchPosts = async () => {
        try {
            const { posts } = await resultRepository.getSearchResult(
                { page: postPage, size: 15, contentTypeId: "pageprofile", session: session} as GetSearchResultFilteredReq
            );
            if (!posts || posts.length === 0) {
                setCanScroll(false);
                if (postPage === 1) setPosts([]);
                return;
            }

            if (postPage === 1) {
                setPosts(posts.map(Post.fromObject))
            } 

            else {
                setPosts(prevPosts => [
                    ...prevPosts,
                    ...posts.map(Post.fromObject)
                ]);
            }

        } catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchEvents = async () => {
        try {
            const { events } = await resultRepository.getSearchResult(
                { page: eventsPage, size: 15, contentTypeId: "pageprofile", session: session} as GetSearchResultFilteredReq
            );

            if (!events || events.length === 0) {
                setCanScroll(false);
                if (eventsPage === 1) setPosts([]);
                return;
            }

            if (eventsPage === 1) {
                setEvents(events.map(Event.fromObject));
            } 

            else {
                setEvents(prevEvents => [
                    ...prevEvents,
                    ...events.map(Event.fromObject)
                ]);
            }

        } catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchProfile = async () => {
        try {
            const userResponse = await userRepository.getById({
                session: session, userId
            } as GetUserByIdReq);

            const userEntity = User.fromObject(userResponse);
            setUser(userEntity);
        } 
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const onProfileClick = (profileId: string) => {
        navigate(`/user/${profileId}`);
    };

    const onClickOnAvatarPost = (post : Post) => {
        if (post.author?.id && !post.pageProfile?.id){
            navigate(`/user/${post.author.id}`);
        }
        else if (post.pageProfile?.id){
            navigate(`/page/${post.pageProfile.id}`);
        }     
    }

    const onClickOnAvatarEvent = (event : Event) => {
        if (event.author?.id && !event.pageProfile?.id){
            navigate(`/user/${event.author.id}`);
        }
        else if (event.pageProfile?.id){
            navigate(`/page/${event.pageProfile.id}`);
        }     
    }

    const onClickOnComments = (postId: string) => {
        navigate(`/post-detail/${postId}`);
    };

    const onClickOnPost = (postId: string) => {
        navigate(`/post-detail/${postId}`);
    };

    const onClickOnEvent = (eventId: string) => {
        navigate(`/event-detail/${eventId}`);
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

    return {
        user,
        posts,
        onProfileClick,
        onClickOnAvatarPost,
        onClickOnAvatarEvent,
        onClickOnComments,
        onClickOnPost,
        onClickOnEvent,
        handleVotePost,
        events,
        onLogout
    };
}