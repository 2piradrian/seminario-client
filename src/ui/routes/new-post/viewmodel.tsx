import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Regex, Errors, type CreatePostReq, PageProfile, Profile, type GetUserByIdReq, type GetPageByUserIdReq } from "../../../domain";
import { ImageHelper, useRepositories } from "../../../core";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";

export function ViewModel() {

    const navigate = useNavigate();

    const { userId, session } = useSession();
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
            if (session != null){
                await fetchProfiles();
            }
        }
        fetchData().then();
    }, [session]);

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

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const form = Object.fromEntries(formData) as {
                title?: string;
                content?: string;
                profile?: string;
            }

            if (!Regex.POST_TITLE.test(form.title || "")) {
                return setError(Errors.INVALID_TITLE);
            }

            if (!Regex.POST_CONTENT.test(form.content || "")) {
                return setError(Errors.INVALID_CONTENT);
            }

            const postFile = formData.get("postImage") as File | null;

            const imageBase64 = postFile && postFile.size > 0
                ? await ImageHelper.convertToBase64(postFile)
                : null;

            const response = await postRepository.create({
                session: session,
                image: imageBase64,
                title: form.title, 
                content: form.content,
                profileId: Profile.toProfile(form.profile, profiles).id,
            } as CreatePostReq);

            toast.success("Post creado correctamente");

            const postId = response.postId;
            navigate(`/post-detail/${postId}`); 
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
