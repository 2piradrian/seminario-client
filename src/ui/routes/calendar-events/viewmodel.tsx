import { useEffect, useState } from "react";
import { useRepositories } from "../../../core";
import { Errors, Event, User, type GetEventAndAssistsPageReq, type GetUserByIdReq } from "../../../domain"
import useSession from "../../hooks/useSession";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewModel() {

    const navigate = useNavigate();

    const { id } = useParams(); 
    const { userId, session } = useSession();
    const { userRepository, eventRepository, sessionRepository } = useRepositories();

    const [user, setUser] = useState<User | null>(null);
    const [events, setEvents] = useState<Event[]>([]);

    { /* useEffect */ }

    useEffect(() => {
            const fetchData = async () => {
                if (session != null){
                    await fetchUser().then();
                    await fetchEvents().then();
                }
            }
            fetchData().then();
        }, [session]);


    { /* fetch */  }

    const fetchUser = async () => {
        try {
            const response = await userRepository.getById({
                session: session,
                userId: userId!
            } as GetUserByIdReq);

            if (response) setUser(User.fromObject(response));
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchEvents = async() => {
        try {
            const events = await eventRepository.getEventAndAssistsPage(
                { session: session, page: 1, size: 10000, userId: id } as GetEventAndAssistsPageReq
            );

            setEvents(prevEvents => [
                ...prevEvents,
                ...events.events.map(Event.fromObject)
            ]);

        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR)
        }
    };

    { /* actions */ }

    const onClickOnEvent = (eventId: string) => {
        if (!user) return;
        navigate(`/event-detail/${eventId}`);
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
        events,
        onClickOnEvent,
        user,
        onLogout
    }
}
