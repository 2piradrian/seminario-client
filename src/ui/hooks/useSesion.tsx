import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRepositories } from "../../core";
import type { AuthUserReq, AuthUserRes, GetSesionRes, Sesion } from "../../domain";

export default function useSesion() {

    const navigate = useNavigate();

    const { sesionRepository, authRepository } = useRepositories();

    const [logged, setLogged] = useState<boolean | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [sesion, setSesion] = useState<Sesion | null>(null);

    useEffect(() => {
        const checkSesion = async () => {
            const isLogged = await checkIfUserIsLogged();
            setLogged(isLogged);
        }

        checkSesion();
    }, []);

    useEffect(() => {
        if (logged === null) return;

        if (
            logged === false && 
            window.location.pathname !== "/login" && 
            window.location.pathname !== "/register"
        ) {
            navigate("/login");
        }
    }, [logged]);

    const checkIfUserIsLogged = async () => {
        try {
            const sesionResponse: GetSesionRes = await sesionRepository.getSesion();
            if (sesionResponse == null) return false;
            
            const authRequest: AuthUserReq = {
                sesion: sesionResponse.sesion,
            };

            const authResponse: AuthUserRes = await authRepository.auth(authRequest);
            if (authResponse == null) return false;

            setUserId(authResponse.id);
            setSesion(sesionResponse.sesion);

            return true;
        }
        catch (error) {
            return false;
        }
    };

    return {
        userId,
        sesion,
        logged,
    };
}