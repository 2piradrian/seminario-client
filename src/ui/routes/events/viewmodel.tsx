import { useNavigate } from "react-router-dom";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import useSession from "../../hooks/useSession";
import { useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import { Errors, Event, Post, User, type GetSearchResultFilteredReq, type GetUserByIdReq } from "../../../domain";
import toast from "react-hot-toast";

export default function ViewModel() {

   const navigate = useNavigate();

    const { trigger } = useScrollLoading();
    const { userId, session } = useSession();
    const { userRepository, resultRepository, postRepository, sessionRepository } = useRepositories();

    const [events, setEvents] = useState<Event[]>([]);
    const [eventPage, setEventPage] = useState<number>(1);
    const [canScroll, setCanScroll] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (session != null && userId != null) {
                await fetchProfile();
                await fetchEvents();
            }
        }
        fetchData().then();
    }, [session]);

    useEffect(() => {
        if (canScroll && session != null) {
            fetchEvents().then();
        }
    }, [trigger]);

    const isEvent = (item: Event | Post): item is Event => {
        return "dateInit" in item;
    };


    const isPost = (_: Event | Post): _ is Post => 
        false;


    const fetchEvents = async () => {
        try {
            const eventsRes = await resultRepository.getSearchResult(
                { page: eventPage, size: 15, contentTypeId: "event", session: session} as GetSearchResultFilteredReq
            );
            if (!eventsRes.events || eventsRes.events.length === 0) {
                setCanScroll(false);
                if (eventPage === 1) setEvents([]);
                return;
            }

            if (eventPage === 1) {
                setEvents(eventsRes.events.map(Event.fromObject));
            } 
            else {
                setEvents(prevEvents => [
                    ...prevEvents,
                    ...eventsRes.events.map(Event.fromObject)
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

    const onClickOnAvatar = (event : Event) => {
        if (event.author?.id && !event.pageProfile?.id){
            navigate(`/user/${event.author.id}`);
        }
        else if (event.pageProfile?.id){
            navigate(`/page/${event.pageProfile.id}`);
        }     
    }

    const onClickOnEvent = (item: Event | Post) => {
        if (!("dateInit" in item)) return;
        navigate(`/event-detail/${item.id}`);
    };

    const onClickOnCreateEvent = () => {
        navigate("/new-event");
    }

    const onClickDelete = (item: Event | Post) => {
        setSelectedItemId(item.id);
        setIsDeleteOpen(true);
    };

    const onClickCancel = (item: Event | Post) => {
        setSelectedItemId(item.id);
        setIsCancelOpen(true);
    };

    const cancelDelete = () => {
        setIsDeleteOpen(false);
        setSelectedItemId(null);
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
        events,
        onProfileClick,
        onClickOnAvatar,
        onClickOnCreateEvent,
        onClickOnEvent,
        onLogout,
        isPost,
        isEvent,
        onClickCancel,
        onClickDelete, 
        cancelDelete
    };
}