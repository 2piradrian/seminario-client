import { useEffect, useMemo, useState } from "react";
import { useRepositories } from "../../../core";
import {Optionable, Regex, Errors, type UserProfile, type GrantRoleUserReq, type RevokeRoleUserReq, type GetAllStaffReq, Role, type GetOwnProfileReq} from "../../../domain";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";

export function ViewModel() {

    const { session } = useSession();
    const { authRepository, userProfileRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);
    const [admins, setAdmins] = useState<UserProfile[]>([]);
    const [moderators, setModerators] = useState<UserProfile[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const TABS = ["Administradores", "Moderadores"];
    const [activeTab, setActiveTab] = useState(TABS[0]);

    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        const fetchData = async () => {
            if (session != null) {
                await fetchStaff();
            }
        };
        fetchData().then();
    }, [session]);

    const fetchStaff = async () => {
        try {
            setIsLoading(true);

            const getAllStaffReq: GetAllStaffReq = { session: session!! };
            const res = await authRepository.getAllStaff(getAllStaffReq);

            const staff = res.staff as unknown as Record<string, UserProfile[]>;

            setAdmins(staff.ADMIN || []);
            setModerators(staff.MODERATOR || []);

            const currentUserProfile = await userProfileRepository.getOwnProfile({ session } as GetOwnProfileReq);
            const adminMatch = (staff.ADMIN || []).some(u => u.id === currentUserProfile.id);
            setIsAdmin(adminMatch);

        } catch (err: any) {
            toast.error(err?.message || Errors.UNKNOWN_ERROR);
        } finally {
            window.location.reload()
            setIsLoading(false);
        }
    };

    const filteredUsers = useMemo(() => {
        if (activeTab === "Administradores") return admins;
        if (activeTab === "Moderadores") return moderators;
        return [];
    }, [activeTab, admins, moderators]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (session == null) {
                return setError("Sesión no válida");
            }

            const formData = new FormData(e.currentTarget);
            const email = formData.get("email") as string;
            const roleName = formData.get("role") as string;

            if (!Regex.EMAIL.test(email || "")) {
                return setError(Errors.INVALID_EMAIL);
            }

            const selectedRole = Optionable.toOptionable(roleName, (Role.getRoleList().filter(role => role.id !== "USER")));

            const dto: GrantRoleUserReq = {
                session: session,
                email: email,
                roleId: selectedRole.id,
            };

            const form = e.currentTarget;

            setIsLoading(true);
            await authRepository.grantRole(dto);

            toast.success("Rol asignado correctamente");
            form.reset();
            await fetchStaff();
        }
        catch (err: any) {
            toast.error(err?.message || Errors.UNKNOWN_ERROR);
        }
        finally {
            setIsLoading(false);
        }
    };

    const onRemoveUser = async (userToRemove: UserProfile) => {
        try{
            if (session == null) {
                return setError("Sesión no válida");
            }

            if (!Regex.EMAIL.test(userToRemove.email || "")) {
                return setError("El email del usuario no es válido.");
            }

            const dto: RevokeRoleUserReq = {
                session: session,
                email: userToRemove.email,
            };

            setIsLoading(true);
            await authRepository.revokeRole(dto);

            toast.success("Rol revocado correctamente");

            setAdmins(prev => prev.filter(u => u.id !== userToRemove.id));
            setModerators(prev => prev.filter(u => u.id !== userToRemove.id));
        }
        catch (err: any) {
            toast.error(err?.message || Errors.UNKNOWN_ERROR);
        }
        finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        tabs: TABS,
        activeTab,
        onTabClick: setActiveTab,
        filteredUsers,
        roleOptions: Role.getRoleList().filter(role => role.id !== "USER"),
        onSubmit,
        onRemoveUser,
        isAdmin
    };
}
