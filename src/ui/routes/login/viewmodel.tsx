import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepositories } from "../../../core";
import { Regex, Errors, type LoginUserReq, type SaveSessionReq, type LoginUserRes, Session } from "../../../domain";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";

export function ViewModel() {

    const navigate = useNavigate();
    
    const { logged } = useSession();
    const { authRepository, sessionRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);

    useEffect(()=> {
        if (error != null){
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        if(logged){
            navigate("/");
        }
    }, [logged]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
        try {
            e.preventDefault();
            
            const form = Object.fromEntries(new FormData(e.currentTarget)) as { 
                email?: string; 
                password?: string 
            };

            if(!Regex.EMAIL.test(form.email || "")){
                return setError(Errors.INVALID_EMAIL);
            }
            
            if(!Regex.PASSWORD.test(form.password || "")){
                return setError(Errors.INVALID_PASSWORD);
            }

            const response: LoginUserRes = await authRepository.login({
                email: form.email!!, 
                password: form.password!!,
            } as LoginUserReq);

            const session: SaveSessionReq = {
                session: new Session(response.token),
            }
            
            await sessionRepository.saveSession(session);

            toast.success("Sesión iniciada correctamente");
            navigate("/");
        }
        catch(error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    }
    
    return {
        onSubmit
    };
    
}
