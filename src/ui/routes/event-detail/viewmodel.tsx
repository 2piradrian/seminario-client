import { useNavigate, useParams } from "react-router-dom";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import useSession from "../../hooks/useSession";
import { useRepositories } from "../../../core";
import { useEffect, useMemo, useState } from "react";
import { Errors, PageProfile, Profile, Event, type GetEventByIdReq, type GetEventByIdRes, type GetPageByUserIdReq, type GetUserByIdReq, type ToggleAssistReq, User } from "../../../domain";
import toast from "react-hot-toast";
import { UserRepository } from "../../../infrastructure";

export default function ViewModel() {
    
    const navigate = useNavigate()

    const { id } = useParams();
    const { trigger } = useScrollLoading();
    const { userId, session } = useSession();
    const { eventRepository, pageRepository, userRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);

    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [event, setEvent] = useState<Event | null>(null);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const [isAssisting, setIsAssisting] = useState(false);
    
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
    
    const onClickDelete = () => {
        setIsDeleteOpen(true)
    };

    const onClickEdit = async () => {
        if (event) navigate(`/edit-event/${event.id}`);
    } 
    
    const cancelDelete = () => {
        setIsDeleteOpen(false)
    };

    const proceedDelete = async () => {}; //TO DO: delete event
    
    const onClickOnEvent = async () => {};

    { /* feature: Assistance */ } 

    const handleToggleAssist = async () => {
        try {

            setIsAssisting(prev => !prev);

        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    }

    { /* date format */ } 

    /* const formatDayMonthYear =  (date: Date) => {
      if (!date) return "Fecha no disponible";

        const months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];

        const day = date.getDate();      
        const month = months[date.getMonth()]; 
        const year = date.getFullYear();   

        return `${day} de ${month} de ${year}`;

    } */


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
        isAssisting
    }
}