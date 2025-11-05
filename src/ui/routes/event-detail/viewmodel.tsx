import { useNavigate, useParams } from "react-router-dom";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { useRepositories } from "../../../core";
import { useEffect, useMemo, useState } from "react";
import { Errors, PageProfile, Profile, Event, type GetEventByIdReq, type GetPageByUserIdReq, type DeleteEventReq, type GetUserByIdReq, type ToggleAssistReq, User } from "../../../domain";
import useSession from "../../hooks/useSession";
import toast from "react-hot-toast";

export default function ViewModel() {
    
    const navigate = useNavigate()

    const { id } = useParams();
    const { trigger } = useScrollLoading();
    const { userId, session } = useSession();
    const { eventRepository, pageRepository, userRepository } = useRepositories();


    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [event, setEvent] = useState<Event | null>(null);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const [isAssisting, setIsAssisting] = useState(false);
    const [assistsQuantity, setAssistsQuantity] = useState<number | null>(1);
    
    { /* useEffect */ }

    useEffect(()=> {
        const fetchData = async () => {
            if (session != null){
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
            setEvent(Event.fromObject(eventRes));

            await fetchProfiles().then();
        } 
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchProfiles = async () => {
        try {
            const userResponse = await userRepository.getUserById(
                { session, userId } as GetUserByIdReq
            );
            const user = User.fromObject(userResponse);

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
            return event.author?.id === userId || event.pageProfile?.ownerId === userId
        }, [event, userId])
    
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
        try {
            await eventRepository.delete({
                session: session,
                eventId: id,
            } as DeleteEventReq);
            toast.success("Evento borrado exitosamente")
            navigate("/profile") 
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };
    
    const onClickOnEvent = async () => {};

    { /* feature: Assistance */ } 

    const handleToggleAssist = async () => {
        try {
            const response = await eventRepository.toggleAssist({
                eventId: id,
                session: session
            });

            setAssistsQuantity(prev => isAssisting ? prev - 1 : prev + 1);
            setIsAssisting(!isAssisting);

            toast.success(isAssisting ? "Asistencia cancelada!" : "Asistencia registrada!");
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    return {
        onClickOnAvatar,
        onClickOnEvent,
        onClickDelete,
        isMine,
        event,
        proceedDelete,
        cancelDelete,
        isDeleteOpen,
        onClickEdit,
        handleToggleAssist,
        isAssisting,
        assistsQuantity
    }
}