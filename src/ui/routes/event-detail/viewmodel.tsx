import { useNavigate, useParams } from "react-router-dom";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import useSession from "../../hooks/useSession";
import { useRepositories } from "../../../core";
import { useEffect, useMemo, useState } from "react";
import { Errors, PageProfile, Profile, Event, type GetEventByIdReq, type GetEventByIdRes, type GetPageByUserIdReq, type GetUserByIdReq, type ToggleAssistReq } from "../../../domain";
import toast from "react-hot-toast";

export default function ViewModel() {
    
    const navigate = useNavigate()

    const { id } = useParams();
    const { trigger } = useScrollLoading();
    const { userId, session } = useSession();
    const { eventRepository, userProfileRepository, pageRepository } = useRepositories();

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
            const userProfile = await userProfileRepository.getUserById(
                { session: session, userId } as GetUserByIdReq
            );
            const pages = await pageRepository.getByUserId(
                { userId: userProfile.id } as GetPageByUserIdReq
            );

            const profilesList: Profile[] = []
            profilesList.push(Profile.fromEntity(userProfile, undefined));

            pages.pages.forEach((page: PageProfile) => {
                profilesList.push(Profile.fromEntity(undefined, PageProfile.fromObject(page)));
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
            await eventRepository.toggleAssist({
                session: session,
                eventId: id
            } as ToggleAssistReq);

            setIsAssisting(prev => !prev);

        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    }

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