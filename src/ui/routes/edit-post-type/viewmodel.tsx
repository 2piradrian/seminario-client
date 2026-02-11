import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { ImageHelper, useRepositories, CONSTANTS } from "../../../core";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Errors, Post, PostType, Regex, User, type EditPostReq, type EditPostTypeReq, type GetPostByIdReq, type GetPostByIdRes, type GetPostTypeByIdReq, type GetPostTypeByIdRes, type GetUserByIdReq } from "../../../domain";

export default function ViewModel() {

    const navigate = useNavigate();

    const { id } = useParams();

    const { session, userId } = useSession();
    const { postTypeRepository, userRepository, catalogRepository, sessionRepository } = useRepositories()
    const [user, setUser] = useState<User | null>(null);

    const [error, setError] = useState<string | null>(null);

    const [postType, setPostType] = useState<PostType | null>(null);
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
                await fetchPostType();
                await fetchUser();
            }
        }
        fetchData().then();
    }, [session]);

    { /*fetch */ }

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

    const fetchPostType = async () => {
        try {
            const getPostTypeByIdReq: GetPostTypeByIdReq = {
                id: id,
                session: session
            }
            const response: GetPostTypeByIdRes = await postTypeRepository.getById(getPostTypeByIdReq)
            
            if (response) {
                const postType = PostType.fromObject(response)
                setPostType(postType);
            }
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    }

    { /* Event handler */ }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.dismiss();

        if (isSubmitting) return;

        const formData = new FormData(e.currentTarget);
        const form = Object.fromEntries(formData);
        
        const payload = {
            name: form.name?.toString().trim() || "",
        };

        if (!Regex.NAME.test(payload.name)) {
            return setError(Errors.INVALID_NAME);
        }
        
        const editPostTypePromise = async () => {
            setIsSubmitting(true);
            try {
                
                const dto: EditPostTypeReq = {
                    name: payload.name,
                    id: id, 
                    session: session
                }
        
                await postTypeRepository.edit(dto);
            } 
            catch (error) {
                throw error;
            } 
            finally {
                setIsSubmitting(false);
            }
        };

        try {
            await toast.promise(
                editPostTypePromise(),
                {
                    loading: CONSTANTS.LOADING_EDIT_CATALOG,
                    success: CONSTANTS.SUCCESS_EDIT_CATALOG,
                    error: (err) => err instanceof Error ? err.message : Errors.UNKNOWN_ERROR,
                }
            );
            navigate(`/admin/manage-catalog/post-types`);
        } catch (error) {}
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
        postType,
        user,
        onLogout,
        isSubmitting
    }
}
