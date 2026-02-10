import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import {
    Errors,
    ModerationReason,
    User,
    type DeleteModerationReasonReq,
    type GetUserByIdReq
} from "../../../domain";
import toast from "react-hot-toast";

export function ViewModel() {

    const navigate = useNavigate();
    const { id } = useParams();

    const { userId, session } = useSession();
    const {
        catalogRepository,
        userRepository,
        sessionRepository,
        moderationReasonRepository
    } = useRepositories();

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const [moderationReasons, setModerationReasons] =
        useState<ModerationReason[]>([]);
    const [moderationReasonToDelete, setModerationReasonToDelete] =
        useState<ModerationReason | null>(null);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    /* Effects */

    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        if (session != null) {
            fetchModerationReasons();
        }
    }, [session]);

    useEffect(() => {
        if (!session || !userId) return;
        fetchUser();
    }, [session, userId]);

    /* Fetch */

    const fetchUser = async () => {
        try {
            const response = await userRepository.getById({
                session,
                userId
            } as GetUserByIdReq);

            setUser(User.fromObject(response));
        } catch (error) {
            toast.error(
                error ? (error as string) : "Error al cargar perfil"
            );
        }
    };

    const fetchModerationReasons = async () => {
        try {
            const response =
                await catalogRepository.getAllModerationReason();
            setModerationReasons(response.moderationReasons);
        } catch (error) {
            toast.error(error?.message || Errors.UNKNOWN_ERROR);
        }
    };

    /* Navigation */

    const onClickOnAddItem = () => {
        navigate(
            "/admin/manage-catalog/moderation-reasons/new-moderation-reason"
        );
    };

    const onClickOnEditItem = (item: ModerationReason) => {
        navigate(
            `/admin/manage-catalog/moderation-reasons/edit-moderation-reason/${item.id}`
        );
    };

    /* Delete flow */

    const onClickDelete = (item: ModerationReason) => {
        setModerationReasonToDelete(item);
        setIsDeleteOpen(true);
    };

    const cancelDelete = () => {
        setModerationReasonToDelete(null);
        setIsDeleteOpen(false);
    };

    const proceedDelete = async () => {
        if (!moderationReasonToDelete || !session) return;

        try {
            await moderationReasonRepository.delete({
                session,
                id: moderationReasonToDelete.id
            } as DeleteModerationReasonReq);

            toast.success("Motivo de moderación borrado exitosamente");

            setModerationReasons(prev =>
                prev.filter(
                    r => r.id !== moderationReasonToDelete.id
                )
            );

            cancelDelete();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : Errors.UNKNOWN_ERROR
            );
        }
    };

    const onLogout = async () => {
        try {
            await sessionRepository.deleteSession();
            toast.success("Sesión cerrada");
            navigate("/login", { replace: true });
        } catch {
            toast.error("No se pudo cerrar sesión");
        }
    };

    return {
        isLoading,
        moderationReasons,
        user,
        onClickOnAddItem,
        onClickOnEditItem,
        onClickDelete,
        cancelDelete,
        proceedDelete,
        onLogout,
        isDeleteOpen
    };
}
