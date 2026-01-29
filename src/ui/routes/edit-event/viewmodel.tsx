import { useEffect, useState } from "react";
import { Errors, Event, Regex, User, type EditEventReq, type GetEventByIdReq, type GetEventByIdRes, type GetUserByIdReq } from "../../../domain";
import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { ImageHelper, useRepositories, CONSTANTS } from "../../../core";
import toast from "react-hot-toast";

export default function ViewModel() {
    
    const navigate = useNavigate();

    const { id } = useParams();

    const { session, userId } = useSession();
    const { eventRepository, userRepository, sessionRepository } = useRepositories()
    
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [event, setEvent] = useState<Event | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        e.preventDefault();
        toast.dismiss();

        if (isSubmitting) return;

        const formData = new FormData(e.currentTarget);
        const form = Object.fromEntries(formData);
        
        const payload = {
            title: form.title?.toString().trim() || "",
            content: form.content?.toString().trim() || "",
            dateInit: form.dateInit?.toString() || "",
            dateEnd: form.dateEnd?.toString() || ""
        };

        if (!Regex.TITLE.test(payload.title)) {
            return setError(Errors.INVALID_TITLE);
        }

        if (!Regex.CONTENT.test(payload.content)) {
            return setError(Errors.INVALID_CONTENT);
        }

        const dateInit = payload.dateInit ? new Date(payload.dateInit) : null;
        const dateEnd = payload.dateEnd ? new Date(payload.dateEnd) : null;

        if (dateInit && dateEnd) {
            const checkInit = new Date(dateInit).setHours(0, 0, 0, 0);
            const checkEnd = new Date(dateEnd).setHours(0, 0, 0, 0);

            if (checkInit > checkEnd) { 
                return setError(Errors.INVALID_EVENT_DATE);
            }
        }

        const editEventPromise = async () => {
            setIsSubmitting(true);
            try {
                const eventFile = formData.get("eventImage") as File | null;

                const imageBase64 = eventFile && eventFile.size > 0
                    ? await ImageHelper.convertToBase64(eventFile)
                    : null;
                
                const dto: EditEventReq = {
                    session: session,
                    eventId: id, 
                    base64Image: imageBase64,
                    title: payload.title, 
                    content: payload.content,
                    dateInit: dateInit,
                    dateEnd: dateEnd,
                }  

                await eventRepository.edit(dto);
            } catch (error) {
                throw error;
            } finally {
                setIsSubmitting(false);
            }
        };

        try {
            await toast.promise(
                editEventPromise(),
                {
                    loading: CONSTANTS.LOADING_EDIT_EVENT,
                    success: CONSTANTS.SUCCESS_EDIT_EVENT,
                    error: (err) => err instanceof Error ? err.message : Errors.UNKNOWN_ERROR,
                }
            );
            navigate(`/user/${user.id}`);
        } catch(error) {}
    };



    const onCancel = () => {
        navigate(`/user/${user.id}`);
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
        onSubmit, 
        onCancel,
        event,
        user,
        onLogout,
        isSubmitting
    }
}
