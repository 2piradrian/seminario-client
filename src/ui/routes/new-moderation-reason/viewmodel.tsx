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
    ModerationReason,
    type CreateModerationReasonReq
} from "../../../domain";
import { ImageHelper, useRepositories, CONSTANTS } from "../../../core";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";

export function ViewModel() {

    const navigate = useNavigate();

    const { userId, session } = useSession();
    const {
        moderationReasonRepository,
        userRepository,
        sessionRepository,
        catalogRepository
    } = useRepositories();
    
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [moderationReasons, setModerationReasons] = useState<ModerationReason[]>([]);
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
                await fetchModerationReasons();
            }
        };
        fetchData().then();
    }, [session]);

    useEffect(() => {
        if (!session || !userId) return;
        fetchUser();
    }, [session, userId]);
    
    const fetchUser = async () => {
        try {
            const response = await userRepository.getById({
                session,
                userId
            } as GetUserByIdReq);

            setUser(User.fromObject(response));
        } catch (error) {
            toast.error(error ? (error as string) : "Error al cargar perfil");
        }
    };

    const fetchModerationReasons = async () => {
        try {
            const response = await catalogRepository.getAllModerationReason();
            setModerationReasons(response.moderationReasons);
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

        const createModerationReasonPromise = async () => {
            setIsSubmitting(true);
            try {
                const response = await moderationReasonRepository.create({
                    session,
                    name: payload.name
                } as CreateModerationReasonReq);
                
                return response;
            } finally {
                setIsSubmitting(false);
            }
        };

        try {
            await toast.promise(
                createModerationReasonPromise(),
                {
                    loading: CONSTANTS.LOADING_EDIT_CATALOG,
                    success: CONSTANTS.SUCCESS_EDIT_CATALOG,
                    error: err =>
                        err instanceof Error
                            ? err.message
                            : Errors.UNKNOWN_ERROR,
                }
            );

            navigate("/admin/manage-catalog/moderation-reasons");
        } 
        catch (error) {           
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onCancel = () => {
        navigate("/admin/manage-catalog/moderation-reasons");
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
