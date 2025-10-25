import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Errors, PageProfile, Profile, Regex, type CreateEventReq, type GetPageByUserIdReq, type GetUserByIdReq } from "../../../domain";
import { ImageHelper, useRepositories } from "../../../core";
import toast from "react-hot-toast";
import useSession from "../../hooks/useSession";

export function ViewModel() {

    const navigate = useNavigate();

    const { userId, session } = useSession();
    const { eventRepository, userProfileRepository, pageRepository } = useRepositories()
    
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [error, setError] = useState<string | null>(null);
    
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

            if (!Regex.POST_TITLE.test(form.title || "")) {
                return setError(Errors.INVALID_TITLE);
            }

            if (!Regex.POST_CONTENT.test(form.content || "")) {
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

        } 
        catch(error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onCancel = () => {
        navigate("/profile");
    };


    return {
        onSubmit,
        onCancel, 
        profiles,
    };
}