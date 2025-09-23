import { useEffect, useState } from "react";
import { useRepositories } from "../../core";
import type { AuthUserReq, GetSesionRes } from "../../domain";
import { useNavigate } from "react-router-dom";

export default function useSesion() {

    const navigate = useNavigate();

    const { sesionRepository, authRepository } = useRepositories();

    const [logged, setLogged] = useState<boolean | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const checkSesion = async () => {
            const isLogged = await checkIfUserIsLogged();
            setLogged(isLogged);
        }

        checkSesion();
    }, []);

    useEffect(() => {
        if (logged === null) return;

        if (logged === false) {
            navigate("/login");
        }
    }, [logged]);

    const checkIfUserIsLogged = async () => {
        try {
            const sesionResponse: GetSesionRes = await sesionRepository.getSesion();
            if (sesionResponse == null) return false;
            
            const authRequest: AuthUserReq = {
                token: sesionResponse.sesion.token.accessToken,
            };

            const authResponse = await authRepository.auth(authRequest);

            if (authResponse == null) return false;

            setUserId(authResponse.id);

            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    };

    return {
        userId,
        logged,
    };
}