import toast from "react-hot-toast";
import { Errors, TimeReportContent, User, type GetReportReq, type GetUserByIdReq } from "../../../domain";
import { useEffect, useState } from "react";
import { Tabs, useRepositories } from "../../../core";
import { useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";

export default function ViewModel() {
    const navigate = useNavigate();
    const { userId, session } = useSession();
    const { userRepository, sessionRepository, reportRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const [reports, setReports] = useState<{
        users: TimeReportContent;
        posts: TimeReportContent;
        events: TimeReportContent;
        pages: TimeReportContent;
    } | null>(null);

    const [activeTab, setActiveTab] = useState<string>(Tabs.results[0].id);

    useEffect(() => {
        if (error) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        if (session) {
            fetchUser();
            fetchReports();     
        }
    }, [session]);

    const fetchUser = async () => {
        try {
            const userResponse = await userRepository.getById({
                session,
                userId,
        } as GetUserByIdReq);

            const userEntity = User.fromObject(userResponse);
            setUser(userEntity);
        } 
        catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchReports = async () => {
        try {
            setIsLoading(true);

            const response = await reportRepository.getReport({
                session,
            } as GetReportReq);

            setReports(response);
        } 
        catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        } 
        finally {
            setIsLoading(false);
        }
    };
    
    const onTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    const onLogout = async () => {
            try {
                await sessionRepository.deleteSession();
                toast.success("Sesión cerrada");
                navigate("/login", { replace: true });
            } 
            catch {
                toast.error("No se pudo cerrar sesión");
            }
    };

    return {
        isLoading,
        activeTab,
        onTabClick,
        user,
        reports,
        onLogout,
    };
}
