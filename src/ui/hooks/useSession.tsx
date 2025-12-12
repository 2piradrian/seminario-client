import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRepositories } from "../../core";
import type { AuthUserReq, AuthUserRes, GetSessionRes, Role, Session } from "../../domain";

export default function useSession() {

    const navigate = useNavigate();

    const { sessionRepository, authRepository } = useRepositories();

    const [logged, setLogged] = useState<boolean | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [role, setRole] = useState<Role | null> (null);

    useEffect(() => {
        const checkSession = async () => {
            const isLogged = await checkIfUserIsLogged();
            setLogged(isLogged);
        }

        checkSession().then();
    }, []);

    useEffect(() => {
        if (logged === null) return;

        if (
            logged === false && 
            window.location.pathname !== "/login" && 
            window.location.pathname !== "/register" &&
            window.location.pathname !== "/reset-password" &&
            !window.location.pathname.startsWith("/edit-password/")
        ) {
            navigate("/login");
        }
    }, [logged]);

    const checkIfUserIsLogged = async () => {
        try {
            const sessionResponse: GetSessionRes = await sessionRepository.getSession();
            if (sessionResponse == null) return false;
            
            const authRequest: AuthUserReq = {
                session: sessionResponse.session,
            };

            const authResponse: AuthUserRes = await authRepository.auth(authRequest);
            if (authResponse == null) return false;

            setUserId(authResponse.id);
            setSession(sessionResponse.session);
            setRole(authResponse.role);


            return true;
        }
        catch (error) {
            return false;
        }
    };

    return {
        userId,
        session,
        logged,
        role
    };

}
