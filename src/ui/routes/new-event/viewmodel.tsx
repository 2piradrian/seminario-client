import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Errors, PageProfile, Profile, Regex, User, type CreateEventReq, type GetPageByUserIdReq, type GetUserByIdReq } from "../../../domain";
import { ImageHelper, useRepositories } from "../../../core";
import toast from "react-hot-toast";
import useSession from "../../hooks/useSession";

export function ViewModel() {

    const navigate = useNavigate();

    const { userId, session } = useSession();
    const { eventRepository, userRepository, pageRepository, sessionRepository} = useRepositories()
    
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [user, setUser] = useState<User | null>(null);
    
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
                await fetchProfiles();
            }
        }
        fetchData().then();
    }, [session]);

    {/* fetch */}

    const fetchProfiles = async () => {
        try {
            const userResponse = await userRepository.getById(
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

            const response = await eventRepository.create({
                session: session,
                image: imageBase64,
                title: form.title, 
                content: form.content,
                dateInit: dateInit,
                dateEnd: dateEnd,
                profileId: Profile.toProfile(form.profile, profiles).id,
            } as CreateEventReq) 

            toast.success("Evento creado correctamente");
            
            const eventId = response.eventId;
            navigate(`/event-detail/${eventId}`); 

        } 
        catch(error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchUser = async () => {
        try {
            if (!userId) return;
            const response = await userRepository.getById({
                session,
                userId
            } as GetUserByIdReq);
            setUser(User.fromObject(response));
        }
        catch (error) {
            toast.error(error ? error as string : "Error al cargar perfil");
        }
    };


    const onCancel = () => {
        navigate("/profile");
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
        profiles,
        onLogout,
        user
    };
}