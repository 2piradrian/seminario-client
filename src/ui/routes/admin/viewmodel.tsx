import { useState } from "react";
import useSession from "../../hooks/useSession";
import { useRepositories } from "../../../core";
import { Errors, User, type GetUserByIdReq } from "../../../domain";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ViewModel() {

    const navigate = useNavigate();
    
    const { userId, session } = useSession();

    const { userRepository, sessionRepository } = useRepositories();
    
    const [user, setUser] = useState<User | null>(null);
    
    const fetchUser = async () => {
        try {
            const response = await userRepository.getById({
                session: session,
                userId: userId!
            } as GetUserByIdReq);

            if (response) setUser(User.fromObject(response));
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
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

    const onClickOnAssignRole = () => {
        navigate("/admin/assign-role");
    };

    const onClickOnReports = () => {
        navigate("/admin/reports");
    };

    const onClickOnManageCatalog = () => {
        navigate("/admin/manage-catalog");
    };
    
    return {
        user,
        onLogout,
        onClickOnAssignRole,
        onClickOnManageCatalog,
        onClickOnReports
    }
}