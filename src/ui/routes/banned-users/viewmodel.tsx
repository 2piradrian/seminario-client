import { useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import { BannedUser, Errors, User, type GetAllBannedUsersReq, type GetUserByIdReq } from "../../../domain";
import toast from "react-hot-toast";

export function ViewModel() {

    const navigate = useNavigate();

    const { userId, session } = useSession();
    const {  sessionRepository, userRepository, bannedUserRepository } = useRepositories();

    const [page, setPage] = useState<number>(1);

    const [bannedUsers, setBannedUsers] = useState<BannedUser[]>([]);

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
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
        fetchBannedUsers();
    }, [session, userId]);

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
            toast.error(error?.message || Errors.UNKNOWN_ERROR);
        }
    };

    const fetchBannedUsers = async () => {
        try {
            if (!session) return;

            setIsLoading(true);

            const response = await bannedUserRepository.getAllBannedUsers({
                session,
                page,
                size: 15
            } as GetAllBannedUsersReq);

            setBannedUsers(response.bannedUsers.map((u: any) => BannedUser.fromObject(u)));


        } 
        catch (error) {
            toast.error(error ? error as string : "Error al cargar usuarios baneados");
        } 
        finally {
            setIsLoading(false);
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
        bannedUsers,
        isLoading,
        page,
        setPage,
        onLogout
    }
}