import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Regex,
    Errors,
    type CreatePostReq,
    PageProfile,
    Profile,
    type GetUserByIdReq,
    type GetPageByUserIdReq,
    User,
    Style,
    type CreateStyleReq
} from "../../../domain";
import { ImageHelper, useRepositories, CONSTANTS } from "../../../core";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";

export function ViewModel() {

    const navigate = useNavigate();

    const { userId, session } = useSession();
    const {
        styleRepository,
        userRepository,
        sessionRepository,
        catalogRepository
    } = useRepositories();
    
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [styles, setStyles] = useState<Style[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    
    useEffect(() => {
        const fetchData = async () => {
            if (session != null) {
                await fetchStyles();
            }
        };
        fetchData();
    }, [session]);
    
    const fetchStyles = async () => {
        try {
            const response = await catalogRepository.getAllStyle();
            setStyles(response.styles);
        } 
        catch (error) {
            toast.error(
                error instanceof Error ? error.message : Errors.UNKNOWN_ERROR
            );
        }
    };

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

        const createStylePromise = async () => {
            setIsSubmitting(true);
            try {
                const response = await styleRepository.create({
                    session,
                    name: payload.name
                } as CreateStyleReq);
                
                return response;
            } finally {
                setIsSubmitting(false);
            }
        };

        try {
            await toast.promise(
                createStylePromise(),
                {
                    loading: CONSTANTS.LOADING_EDIT_CATALOG,
                    success: CONSTANTS.SUCCESS_EDIT_CATALOG,
                    error: err =>
                        err instanceof Error
                            ? err.message
                            : Errors.UNKNOWN_ERROR,
                }
            );
            
            navigate(`/admin/manage-catalog/styles`); 
        } 
        catch (error) {
            toast.error(
                error instanceof Error ? error.message : Errors.UNKNOWN_ERROR
            );
        }
    };

    const onCancel = () => {
        navigate(`/admin/manage-catalog/styles`);
    };

    const onLogout = async () => {
        try {
            await sessionRepository.deleteSession();
            toast.success("Sesión cerrada");
            navigate("/login", { replace: true });
        }
        catch {
            toast.error("No se pudo cerrar sesión");
        }
    };

    return {
        onSubmit,
        onCancel,
        error,
        user,
        onLogout,
        isSubmitting
    };
}
