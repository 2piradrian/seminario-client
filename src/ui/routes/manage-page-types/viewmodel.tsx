import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import { Errors, PageType, PostType, User, type CreatePostTypeReq, type DeletePostTypeReq, type GetUserByIdReq } from "../../../domain";
import toast from "react-hot-toast";

export function ViewModel() {

    const navigate = useNavigate();

    const { id } = useParams();

    const { userId, session } = useSession();
    const { catalogRepository, userRepository, sessionRepository, pageTypeRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const [pageTypes, setPageTypes] = useState<PageType[]>([]);
    const [pageTypeToDelete, setPageTypeToDelete] = useState<PageType | null>(null);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        if (!session || !userId) return;
        fetchUser();
    }, [session, userId]);

    useEffect(() => {
        const fetchData = async () => {
            if (session != null) {
                await fetchPageTypes();
            }
        };
        fetchData().then();
    }, [session]);

    const fetchUser = async () => {
        try {
            if (!userId) return;
            const response = await userRepository.getById({
                session,
                userId
            } as GetUserByIdReq);
            setUser(User.fromObject(response));
        }
        catch (error) {
            toast.error(error ? error as string : "Error al cargar perfil");
        }
    };

    const fetchPageTypes = async () => {
        try {
            const response = await catalogRepository.getAllPageType();

            setPageTypes(response.pageTypes)
        }
        catch (error) {
            toast.error(error?.message || Errors.UNKNOWN_ERROR);
        }
    }

    const onClickOnAddItem = () => {
        navigate("/admin/manage-catalog/page-types/new-page-type");
    };

    const onClickOnEditItem = (item: PageType) => {
        navigate(`/admin/manage-catalog/page-types/edit-page-type/${item.id}`);

    };

    const onClickDelete = (item: PageType) => {
        setPageTypeToDelete(item);
        setIsDeleteOpen(true);
    };

    const cancelDelete = () => {
        setPageTypeToDelete(null);
        setIsDeleteOpen(false);
    };

    const proceedDelete = async () => {
        if (!pageTypeToDelete || !session) return;

        try {
            await pageTypeRepository.delete({
                session,
                id: pageTypeToDelete.id,
            } as DeletePostTypeReq);

            toast.success("Tipo de página borrado exitosamente");

            setPageTypes(prev =>
                prev.filter(pt => pt.id !== pageTypeToDelete.id)
            );

            cancelDelete();
            navigate(`/admin/manage-catalog/page-types`, { replace: true })
        }
        catch (error) {
            toast.error(
                error instanceof Error ? error.message : Errors.UNKNOWN_ERROR
            );
        }
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
        isLoading,
        pageTypes,
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