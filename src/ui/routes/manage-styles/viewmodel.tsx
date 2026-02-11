import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import {
    Errors,
    Style,
    User,
    type DeleteStyleReq,
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
        styleRepository
    } = useRepositories();

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const [styles, setStyles] = useState<Style[]>([]);
    const [styleToDelete, setStyleToDelete] = useState<Style | null>(null);

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
            fetchStyles();
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
            toast.error(error ? (error as string) : "Error al cargar perfil");
        }
    };

    const fetchStyles = async () => {
        try {
            const response = await catalogRepository.getAllStyle();
            setStyles(response.styles);
        } catch (error) {
            toast.error(error?.message || Errors.UNKNOWN_ERROR);
        }
    };

    /* Navigation */

    const onClickOnAddItem = () => {
        navigate("/admin/manage-catalog/styles/new-style");
    };

    const onClickOnEditItem = (item: Style) => {
        navigate(`/admin/manage-catalog/styles/edit-style/${item.id}`);
    };

    /* Delete flow */

    const onClickDelete = (item: Style) => {
        setStyleToDelete(item);
        setIsDeleteOpen(true);
    };

    const cancelDelete = () => {
        setStyleToDelete(null);
        setIsDeleteOpen(false);
    };

    const proceedDelete = async () => {
        if (!styleToDelete || !session) return;

        try {
            await styleRepository.delete({
                session,
                id: styleToDelete.id
            } as DeleteStyleReq);

            toast.success("Estilo borrado exitosamente");

            setStyles(prev =>
                prev.filter(s => s.id !== styleToDelete.id)
            );

            cancelDelete();
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : Errors.UNKNOWN_ERROR
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
        styles,
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
