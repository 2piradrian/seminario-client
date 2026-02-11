import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import { Errors, PostType, User, type CreatePostTypeReq, type DeletePostTypeReq, type GetUserByIdReq } from "../../../domain";
import toast from "react-hot-toast";

export function ViewModel() {

    const navigate = useNavigate();

    const { id } = useParams();

    const { userId, session } = useSession();
    const { catalogRepository, userRepository, sessionRepository, postTypeRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const [postTypes, setPostTypes] = useState<PostType[]>([]);
    const [postTypeToDelete, setPostTypeToDelete] = useState<PostType | null>(null);

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
                await fetchPostTypes();
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

    const fetchPostTypes = async () => {
        try {
            const response = await catalogRepository.getAllPostType();

            setPostTypes(response.postTypes)
        }
        catch (error) {
            toast.error(error?.message || Errors.UNKNOWN_ERROR);
        }
    }

    const onClickOnAddItem = () => {
        navigate("/admin/manage-catalog/post-types/new-post-type");
    };

    const onClickOnEditItem = (item: PostType) => {
        navigate(`/admin/manage-catalog/post-types/edit-post-type/${item.id}`);

    };

    const onClickDelete = (item: PostType) => {
        setPostTypeToDelete(item);
        setIsDeleteOpen(true);
    };

    const cancelDelete = () => {
        setPostTypeToDelete(null);
        setIsDeleteOpen(false);
    };

    const proceedDelete = async () => {
        if (!postTypeToDelete || !session) return;

        try {
            await postTypeRepository.delete({
                session,
                id: postTypeToDelete.id,
            } as DeletePostTypeReq);

            toast.success("Tipo de publicación borrado exitosamente");

            setPostTypes(prev =>
                prev.filter(pt => pt.id !== postTypeToDelete.id)
            );

            cancelDelete();
            navigate(`/admin/manage-catalog/post-types`, { replace: true })
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
        postTypes,
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