import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Regex, Errors, type CreatePostReq, PageProfile, Profile, type GetUserByIdReq, type GetPageByUserIdReq, User, PostType } from "../../../domain";
import { ImageHelper, useRepositories } from "../../../core";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";

export function ViewModel() {

    const navigate = useNavigate();

    const { userId, session } = useSession();
        const { postRepository, userRepository, pageRepository, catalogRepository } = useRepositories();
    
        const [profiles, setProfiles] = useState<Profile[]>([]);
        const [postTypes, setPostTypes] = useState<PostType[]>([]);
        const [error, setError] = useState<string | null>(null);
        const [user, setUser] = useState<User | null>(null);
    
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
                    await fetchPostTypes();
                }
            }
            fetchData().then();
        }, [session]);
    
        const fetchPostTypes = async () => {
            try {
                const response = await catalogRepository.getAllPostType();
                setPostTypes(response.postTypes);
            } 
            catch (error) {
                toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
            }
        }
    
    const fetchProfiles = async () => {
        try {
            const userResponse = await userRepository.getById(
                { session, userId } as GetUserByIdReq
            );
            const user = User.fromObject(userResponse);
            setUser(user);

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

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const form = Object.fromEntries(formData) as {
                title?: string;
                content?: string;
                profile?: string;
                postType?: string;
            }

            if (!Regex.TITLE.test(form.title || "")) {
                return setError(Errors.INVALID_TITLE);
            }

            if (!Regex.CONTENT.test(form.content || "")) {
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
                postTypeId: PostType.toPostType(form.postType, postTypes).id,
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
        postTypes,
        error,
        user
    };
}
