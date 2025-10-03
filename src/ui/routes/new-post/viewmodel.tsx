import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Regex, Errors, type CreatePostReq, Page, UserProfile, Profile, type GetUserByIdReq, type GetPageByUserIdReq } from "../../../domain";
import { useRepositories } from "../../../core";
import useSesion from "../../hooks/useSesion";
import toast from "react-hot-toast";

export function ViewModel() {

    const navigate = useNavigate();

    const { userId, sesion } = useSesion();
    const { postRepository, userProfileRepository, pageRepository } = useRepositories()

    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=> {
        if (error != null){
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(()=> {
        const fetchData = async () => {
            if (sesion != null){
                await fetchProfiles();
            }
        }
        fetchData();
    }, [sesion]);

    const fetchProfiles = async () => {
        try {
            const userProfile = await userProfileRepository.getUserById(
                { userId } as GetUserByIdReq
            );
            const pages = await pageRepository.getByUserId(
                { userId: userProfile.id } as GetPageByUserIdReq
            );

            console.log(pages)

            const profilesList = []
            profilesList.push(Profile.fromEntity(userProfile))
            pages.pages.map((page: Page) => {
                profiles.push(Profile.fromEntity(page));
            });

            console.log(profilesList)

            setProfiles(profilesList);
        } 
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const form = Object.fromEntries(formData) as {
                title?: string;
                content?: string;
            }

            if (!Regex.POST_TITLE.test(form.title || "")) {
                return setError(Errors.INVALID_TITLE);
            }

            if (!Regex.POST_CONTENT.test(form.content || "")) {
                return setError(Errors.INVALID_CONTENT);
            }

            const dto: CreatePostReq = {
                sesion: sesion,
                title: form.title, 
                content: form.content,
                pageId: "",
                image: ""
            }

            postRepository.create(dto);
            toast.success("Post creado correctamente");
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
        error
    };
}
