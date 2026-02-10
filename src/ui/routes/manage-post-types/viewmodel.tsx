import { useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import { Category, Errors, PostType, User, type GetUserByIdReq } from "../../../domain";
import toast from "react-hot-toast";

export function ViewModel() {

    const navigate = useNavigate();

    const { userId, session } = useSession();
    const { catalogRepository, userRepository, sessionRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const [postTypes, setPostTypes] = useState<PostType[]>([]);

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

    const onClickOnEditItem = async () => {};
    const onClickOnAddItem = async () => {};
    const onClickOnDeleteItem = async () => {};


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
        onClickOnDeleteItem,
        onClickOnEditItem,
        onLogout
    }
}