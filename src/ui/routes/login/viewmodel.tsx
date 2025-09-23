import { useEffect, useState } from "react";
import { Regex, Errors, type LoginUserReq, type SaveSesionReq } from "../../../domain";
import { useRepositories } from "../../../core";
import toast from "react-hot-toast";

export function ViewModel() {

    const { authRepository, sesionRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);

    useEffect(()=> {
        if (error != null){
            toast.error(error);
            setError(null);
        }
    }, [error])

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

            const dto: LoginUserReq = {
                email: form.email!!, 
                password: form.password!!,
            }

            const response = await authRepository.login(dto);

            const sesion: SaveSesionReq = {
                sesion: {
                    token: response.token,
                }
            }
            
            sesionRepository.saveSesion(sesion)

            toast.success("Sesión iniciada correctamente")
        }
        catch(error) {
            toast.error("Error al iniciar sesión")
        }

    }
    
    return {
        onSubmit
    };
    
}