import { useNavigate, useParams } from "react-router-dom";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { useRepositories } from "../../../core";
import { useEffect, useMemo, useState } from "react";
import { Errors, PageProfile, Profile, Event, type GetEventByIdReq, type GetPageByUserIdReq, type DeleteEventReq, type GetUserByIdReq, type ToggleAssistReq, User, Role, type CancelEventReq } from "../../../domain";
import useSession from "../../hooks/useSession";
import toast from "react-hot-toast";
import { EventStatus } from "../../../domain/entity/event-status";

export default function ViewModel() {

    const navigate = useNavigate()

    const { id } = useParams();
    const { trigger } = useScrollLoading();
    const [user, setUser] = useState<User | null>(null);
    const { userId, session } = useSession();
    const { eventRepository, pageRepository, userRepository, sessionRepository } = useRepositories();
    const [isEnded, setIsEnded] = useState(false);

    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [event, setEvent] = useState<Event | null>(null);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);

    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    { /* useEffect */ }

    useEffect(() => {
        const fetchData = async () => {
            if (session != null) {
                await fetch();
            }
        }
        fetchData().then();
    }, [session]);

    { /* fetch */ }

    const fetch = async () => {
        try {
            const eventRes = await eventRepository.getById(
                { eventId: id, session } as GetEventByIdReq
            );

            setEvent(prev =>
                prev ? Event.fromObject({ ...prev, ...eventRes }) : Event.fromObject(eventRes)
            );

            if (eventRes.status.toString() === EventStatus.ENDED) {
                setIsEnded(true);
            }

            await fetchProfiles().then();
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchProfiles = async () => {
        try {
            const userResponse = await userRepository.getById(
                { session, userId } as GetUserByIdReq
            );
            const user = User.fromObject(userResponse);
            setCurrentUserRole(user.role);

            setUser(user);

            const pagesResponse = await pageRepository.getByUserId(
                { session, userId: user.id } as GetPageByUserIdReq
            );
            const pages = pagesResponse.pages.map(p => PageProfile.fromObject(p));

            const profilesList: Profile[] = []
            profilesList.push(user.toProfile());

            pages.forEach((page: PageProfile) => {
                profilesList.push(page.toProfile());
            });

            setProfiles(profilesList);
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    }

    { /* actions */ }

    const isMine = useMemo(() => {
        if (!event || !userId) return false
        return event.author?.id === userId || event.pageProfile?.owner?.id === userId
    }, [event, userId])

    const isAdminOrMod = useMemo(() => {
        return currentUserRole === Role.ADMIN || currentUserRole === Role.MODERATOR;
    }, [currentUserRole]);

    const onClickOnAvatar = () => {
        navigate(event.pageProfile.id ? `/page/${event.pageProfile.id}` : `/user/${event.author.id}`);
    };

    const onClickEdit = async () => {
        if (event) navigate(`/edit-event/${event.id}`);
    }

    const onClickDelete = () => {
        setIsDeleteOpen(true)
    };

    const cancelDelete = () => {
        setIsDeleteOpen(false)
    };

    const proceedDelete = async () => {
        const eventId = event?.id ?? id;
        if (!eventId) {
            toast.error("No se pudo identificar el evento a borrar");
            return;
        }

        try {
            await eventRepository.delete({
                session: session,
                eventId,
            } as DeleteEventReq);
            toast.success("Evento borrado exitosamente");
            setIsDeleteOpen(false);
            navigate(`/user/${userId}`);
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onClickCancel = () => {
        setIsCancelOpen(true)
    };

    const cancelCancelEvent = () => {
        setIsCancelOpen(false)
    };

    const proceedCancel = async () => {
        const eventId = event?.id ?? id;

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
            navigate(`/event-detail/${eventId}`);
        }

        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const toggleMenu = (id: string) => {
        if (activeMenuId === id) {
            setActiveMenuId(null);
        } else {
            setActiveMenuId(id);
        }
    };

    const closeMenu = () => setActiveMenuId(null);
    const onClickOnEvent = async () => {};

    { /* feature: Assistance */ }

    const handleToggleAssist = async () => {

        try {
            const response = await eventRepository.toggleAssist({
                session,
                eventId: id
            } as ToggleAssistReq);

            setEvent(prev =>
                prev ? Event.fromObject({ ...prev, ...response }) : Event.fromObject(response)
            );


            toast.success(
                response.isAssisting
                    ? "Dejaste de asistir a este evento"
                    : "Ahora asistes a este evento"
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
            navigate("/login", { replace: true })
        }
        catch (e) {
            toast.error("No se pudo cerrar sesión")
        }
    }

    return {
        onClickOnAvatar,
        onClickOnEvent,
        onClickDelete,
        onClickCancel,
        user,
        isMine,
        isAdminOrMod,
        event,
        proceedDelete,
        proceedCancel,
        cancelDelete,
        cancelCancelEvent,
        isDeleteOpen,
        isCancelOpen,
        onClickEdit,
        handleToggleAssist,
        isEnded,
        activeMenuId,
        toggleMenu,
        closeMenu,
        onLogout
    }
}
