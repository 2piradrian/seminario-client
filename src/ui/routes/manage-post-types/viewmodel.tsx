import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import { Errors, PostType, User, type CreatePostTypeReq, type GetUserByIdReq } from "../../../domain";
import toast from "react-hot-toast";

export function ViewModel() {

    const navigate = useNavigate();

    const { id } = useParams();

    const { userId, session } = useSession();
    const { catalogRepository, userRepository, sessionRepository, postTypeRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const [isFormOpen, setIsFormOpen] = useState(false);

    const [postTypes, setPostTypes] = useState<PostType[]>([]);

    const [itemToEdit, setItemToEdit] = useState<PostType | null>(null);

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
        setItemToEdit(null);
        setIsFormOpen(true);
    };

    const onClickOnEditItem = (item: PostType) => {
        setItemToEdit(item);
        setIsFormOpen(true);
    };

    const handleCancel = () => {
        setItemToEdit(null);
        setIsFormOpen(false);
    };

    const onClickOnDeleteItem = async (item: PostType) => {
        if (!session) return;

        try {
            await postTypeRepository.delete({
            id: item.id,
            session
            });

            toast.success("Tipo de publicación eliminado");
            await fetchPostTypes();
        } catch (error) {
            toast.error("Error al eliminar el tipo de publicación");
        }
        };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!session) return;

        const formData = new FormData(e.currentTarget);

        try {
            if (itemToEdit) {
                await postTypeRepository.edit({ 
                    session,
                    id: itemToEdit.id,
                    name: formData.get("name") as string
                });
            } 
            else {
                await postTypeRepository.create({
                    session,
                    name: formData.get("name") as string
                } as CreatePostTypeReq);

                toast.success("Cliente creado correctamente");
            }

            await fetchPostTypes();
            setIsFormOpen(false);
        } 
        catch (error) {
            toast.error("Error al guardar el tipo de publicación");
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

    isFormOpen,
    itemToEdit,

    onClickOnAddItem,
    onClickOnDeleteItem,
    onClickOnEditItem,

    handleCancel,
    handleSubmit,

    onLogout
    };

}