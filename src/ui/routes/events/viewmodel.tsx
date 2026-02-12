import { useNavigate } from "react-router-dom";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import useSession from "../../hooks/useSession";
import { useRepositories } from "../../../core";
import { useEffect, useMemo, useState } from "react";
import { Errors, Event, Post, Role, User, ModerationReason, type DeleteEventReq, type GetSearchResultFilteredReq, type GetUserByIdReq } from "../../../domain";
import toast from "react-hot-toast";

export default function ViewModel() {

   const navigate = useNavigate();

    const { trigger } = useScrollLoading();
    const { userId, session } = useSession();
    const { userRepository, resultRepository, eventRepository, sessionRepository, catalogRepository } = useRepositories();

    const [events, setEvents] = useState<Event[]>([]);
    const [eventPage, setEventPage] = useState<number>(1);
    const [canScroll, setCanScroll] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const [moderationReasons, setModerationReasons] = useState<ModerationReason[]>([]);
    const [selectedDeleteReason, setSelectedDeleteReason] = useState<string>("Seleccionar");

    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);

    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (session != null && userId != null) {
                await fetchProfile();
                await fetchEvents();
                await fetchModerationReasons();
            }
        }
        fetchData().then();
    }, [session]);

    useEffect(() => {
        if (canScroll && session != null) {
            fetchEvents().then();
        }
    }, [trigger]);

    const isMine = useMemo(() => {
        if (!user || !userId) return false
        return user.id === userId
    }, [user, userId])

    const isAdminOrMod = useMemo(() => {
        return user?.role === Role.ADMIN || user?.role === Role.MODERATOR;
    }, [user]);

    const isAdmin = useMemo(() => {
        return user?.role === Role.ADMIN;
    }, [user]);

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

    const onClickOnEvent = (item: Event) => {
        navigate(`/event-detail/${item.id}`);
    };

    const onClickOnCreateEvent = () => {
        navigate("/new-event");
    }

    const onClickDelete = (item: Event) => {
        setSelectedItemId(item.id);
        setSelectedDeleteReason("Seleccionar");
        setIsDeleteOpen(true);
    };

    const onClickCancel = (item: Event) => {
        setSelectedItemId(item.id);
        setIsCancelOpen(true);
    };

    const cancelDelete = () => {
        setIsDeleteOpen(false);
        setSelectedItemId(null);
        setSelectedDeleteReason("Seleccionar");
    };

    const isItemMine = (item: Post | Event) => {
        if (!item || !userId) return false;
        return item.author?.id === userId || item.pageProfile?.owner?.id === userId;
    };

    const selectedItem = useMemo(() => {
        if (!selectedItemId) return null;
        return events.find(item => item.id === selectedItemId) ?? null;
    }, [events, selectedItemId]);

    const isSelectedItemMine = useMemo(() => {
        if (!selectedItem) return false;
        return isItemMine(selectedItem);
    }, [selectedItem, userId]);

    const shouldShowDeleteReasonSelector = useMemo(() => {
        return isAdminOrMod && !isSelectedItemMine;
    }, [isAdminOrMod, isSelectedItemMine]);

    const moderationReasonOptions = useMemo(() => {
        return moderationReasons.map(r => r.name);
    }, [moderationReasons]);

    const onClickEdit = (item: Event | Post) => {
        navigate(`/edit-event/${item.id}`);
    };

    const proceedDelete = async () => {
        if (!selectedItem) return;

        try {
            let reasonId = "";
            if (isAdminOrMod && !isSelectedItemMine) {
                const reason = moderationReasons.find(r => r.name === selectedDeleteReason);
                if (!reason) {
                    toast.error("Selecciona un motivo de eliminación");
                    return;
                }
                reasonId = reason.id;
            }

            await eventRepository.delete({
                session,
                eventId: selectedItem.id,
                reasonId
            } as DeleteEventReq);

            setEvents(prev => prev.filter(item => item.id !== selectedItem.id));
            toast.success("Evento borrado exitosamente");
            setIsDeleteOpen(false);
            setSelectedItemId(null);
            setSelectedDeleteReason("Seleccionar");
        }
        catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };

    const onToggleMenu = (id: string) => {
        if (activeMenuId === id) {
            setActiveMenuId(null);
        } else {
            setActiveMenuId(id);
        }
    };

    const onCloseMenu = () => setActiveMenuId(null);
    
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
        onClickCancel,
        onClickDelete, 
        onClickEdit,
        proceedDelete,
        cancelDelete,
        isMine,
        isItemMine,
        isAdmin,
        isAdminOrMod,
        isDeleteOpen,
        moderationReasonOptions,
        selectedDeleteReason,
        setSelectedDeleteReason,
        shouldShowDeleteReasonSelector,
        onCloseMenu,
        onToggleMenu,
        activeMenuId
    };
}
