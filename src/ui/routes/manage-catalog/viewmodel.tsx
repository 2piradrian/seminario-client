import { useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import { User, type GetUserByIdReq } from "../../../domain";
import toast from "react-hot-toast";

export function ViewModel() {

    const navigate = useNavigate();

    const { userId, session } = useSession();
    const {  sessionRepository, userRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

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

    const onClickOnInstruments = () => {
        navigate("/admin/manage-catalog/instruments");
    };

    const onClickOnPageTypes = () => {
        navigate("/admin/manage-catalog/page-types");
    };

    const onClickOnPostType = () => {
        navigate("/admin/manage-catalog/post-types");
    };

    const onClickOnStyles = () => {
        navigate("/admin/manage-catalog/styles");
    };

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
		user,
        onClickOnInstruments,
        onClickOnPageTypes,
        onClickOnPostType,
        onClickOnStyles,
		onLogout
    }
}