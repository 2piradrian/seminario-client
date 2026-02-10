import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Regex, Errors, type CreatePostReq, PageProfile, Profile, type GetUserByIdReq, type GetPageByUserIdReq, User, PostType, type CreatePostTypeReq } from "../../../domain";
import { ImageHelper, useRepositories, CONSTANTS } from "../../../core";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";

export function ViewModel() {

    const navigate = useNavigate();

    const { userId, session } = useSession();
    const { postTypeRepository, userRepository, sessionRepository, catalogRepository } = useRepositories();
    
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [postTypes, setPostTypes] = useState<PostType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    useEffect(()=> {
        if (error != null){
            toast.error(error);
            setError(null);
        }
    }, [error]);
    
    useEffect(()=> {
        const fetchData = async () => {
            if (session != null){
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
    

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.dismiss();

        if (isSubmitting) return;

        const formData = new FormData(e.currentTarget);
        const form = Object.fromEntries(formData);
        
        const payload = {
            name: form.name?.toString().trim() || "",
        }

        if (!Regex.NAME.test(payload.name)) {
            return setError(Errors.INVALID_NAME);
        }

        const createPostTypePromise = async () => {
            setIsSubmitting(true);
            try {
                const response = await postTypeRepository.create({
                    session: session,
                    name: payload.name
                } as CreatePostTypeReq);
                
                return response;
            } catch (error) {
                throw error;
            } finally {
                setIsSubmitting(false);
            }
        };

        try {
            const response = await toast.promise(
                createPostTypePromise(),
                {
                    loading: CONSTANTS.LOADING_EDIT_CATALOG,
                    success: CONSTANTS.SUCCESS_EDIT_CATALOG,
                    error: (err) => err instanceof Error ? err.message : Errors.UNKNOWN_ERROR,
                }
            );
            
            navigate(`/admin/manage-catalog/post-types`); 
        } catch(error) {}
    };

    const onCancel = () => {
        navigate(`/admin/manage-catalog/post-types`);
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
        error,
        user,
        onLogout,
        isSubmitting
    };
}
