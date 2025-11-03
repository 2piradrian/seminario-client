import { useEffect, useMemo, useState } from "react";
import { useRepositories } from "../../../core";
import {Optionable, Regex, Errors, type UserProfile, type GrantRoleUserReq, type RevokeRoleUserReq, type GetAllStaffReq, Role, User, type GetUserByIdReq} from "../../../domain";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";

export function ViewModel() {

    const { userId, session } = useSession();
    const { authRepository, userRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);
    const [admins, setAdmins] = useState<User[]>([]);
    const [moderators, setModerators] = useState<User[]>([]);
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

            const response = await authRepository.getAllStaff(
                { session } as GetAllStaffReq
            );
            
            const staff = response.staff
            const admins = staff.filter(member => member.role === 'ADMIN');
            const moderators = staff.filter(member => member.role === 'MODERATOR');

            setAdmins(admins.map(a => User.fromObject(a)));
            setModerators(moderators.map(m => User.fromObject(m)));

            const currentUserProfile = await userRepository.getUserById(
                { session, userId } as GetUserByIdReq
            );

            const adminMatch = admins.some(a => a.id === currentUserProfile.id);
            setIsAdmin(adminMatch);

        } 
        catch (err: any) {
            toast.error(err?.message || Errors.UNKNOWN_ERROR);
        } 
        finally {
            setIsLoading(false);
        }
    };

    const filteredUsers = useMemo(() => {
        if (activeTab === "Administradores") return admins;
        if (activeTab === "Moderadores") return moderators;
        return [];
    }, [activeTab, admins, moderators]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            
            const formData = new FormData(e.currentTarget);
            const form = Object.fromEntries(formData) as {
                email?: string;
                role?: string;
            };
        
            if (!Regex.EMAIL.test(form.email || "")) {
                return setError(Errors.INVALID_EMAIL);
            }
        
            const selectedRole = Optionable.toOptionable(
                form.role,
                Role.getRoleList().filter(role => role.id !== "USER")
            );
        
            const dto: GrantRoleUserReq = {
                session: session,
                email: form.email!,
                roleId: selectedRole.id,
            };
        
            setIsLoading(true);
        
            await authRepository.grantRole(dto);
        
            toast.success("Rol asignado correctamente");
        
            e.currentTarget.reset();
            await fetchStaff();
        }
        catch (err: any) {
            toast.error(err?.message || Errors.UNKNOWN_ERROR);
        }
        finally {
            setIsLoading(false);
        }
    };

    const onRemoveUser = async (userToRemove: User) => {
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
