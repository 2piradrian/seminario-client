import { useEffect, useState } from "react";
import { Errors, Event, Regex, User, type EditEventReq, type GetEventByIdReq, type GetEventByIdRes, type GetUserByIdReq } from "../../../domain";
import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { ImageHelper, useRepositories } from "../../../core";
import toast from "react-hot-toast";

export default function ViewModel() {
    
    const navigate = useNavigate();

    const { id } = useParams();

    const { session, userId } = useSession();
    const { eventRepository, userRepository } = useRepositories()
    
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [event, setEvent] = useState<Event | null>(null);

    {/* useEffect */}

    useEffect(()=> {
        if (error != null){
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(()=> {
        const fetchData = async () => {
            if (session != null){
                await fetchEvent();
                await fetchUser();
            }
        }
        fetchData().then();
    }, [session]);

    {/* fetch */}

    const fetchUser = async () => {
        try {
            const response = await userRepository.getById({
                session: session,
                userId: userId!
            } as GetUserByIdReq);
            if (response) {
                setUser(User.fromObject(response));
            }
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchEvent = async () => {
        try {
            const getEventByIdReq: GetEventByIdReq = {
                session: session,
                eventId: id
            }; 
            const response: GetEventByIdRes = await eventRepository.getById(getEventByIdReq)

            if (response) {
                const event = Event.fromObject({
                    ...response
                });

                setEvent(event);
            }
            
        } 
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    {/* Event handler */}

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const form = Object.fromEntries(formData) as {
                title?: string;
                content?: string;
                profile?: string;
                dateInit?: string;
                dateEnd?: string;
            }

            if (!Regex.TITLE.test(form.title || "")) {
                return setError(Errors.INVALID_TITLE);
            }

            if (!Regex.CONTENT.test(form.content || "")) {
                return setError(Errors.INVALID_CONTENT);
            }

            const dateInit = form.dateInit ? new Date(form.dateInit) : null;
            const dateEnd = form.dateEnd ? new Date(form.dateEnd) : null;
            
            if (dateInit >= dateEnd) { 
                toast.error("La fecha de inicio debe ser anterior a la fecha de fin.");
            }

            const eventFile = formData.get("eventImage") as File | null;

            const imageBase64 = eventFile && eventFile.size > 0
                ? await ImageHelper.convertToBase64(eventFile)
                : null;
            
            
            const dto: EditEventReq = {
                session: session,
                eventId: id, 
                base64Image: imageBase64,
                title: form.title, 
                content: form.content,
                dateInit: dateInit,
                dateEnd: dateEnd,
            }  

            await eventRepository.edit(dto)
            toast.success("Evento editado correctamente");
            navigate(`/user/${user.id}`);
            
        } 
        catch(error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onCancel = () => {
        navigate(`/user/${user.id}`);
    };

    return {
        onSubmit, 
        onCancel,
        event
    }
}