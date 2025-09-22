import { useEffect, useState } from "react";
import { Regex, Errors } from "../../../domain";
import toast from "react-hot-toast";
import { useRepositories } from "../../../core/provider/RepositoryProvider";
import type { RegisterUserReq } from "../../../domain/dto/auth/request/RegisterUserReq";

export function ViewModel() {

    const { authRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null); 
    
    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null); 
        }
    }, [error]); 

    const onSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
        try {
            e.preventDefault();

            const form = Object.fromEntries(new FormData(e.currentTarget)) as { 
                name?: string;
                surname?: string; 
                email?: string; 
                password?: string 
            };


            if(!Regex.NAME.test(form.name || "")){
                return setError(Errors.INVALID_NAME);
            }

            if(!Regex.SURNAME.test(form.surname || "")){
                return setError(Errors.INVALID_LASTNAME);
            }

            if(!Regex.EMAIL.test(form.email || "")){
                return setError(Errors.INVALID_EMAIL);
            }
            
            if(!Regex.PASSWORD.test(form.password || "")){
                return setError(Errors.INVALID_PASSWORD);
            } 
            const dto: RegisterUserReq = {
                name: form.email!!,
                surname: form.surname!!,
                email: form.email!!,
                password: form.password!!,
            }

            await authRepository.register(dto);

            toast.success("Sesión iniciada correctamente")
        }
        catch (error) {
            toast.error("Error al iniciar sesión")
        }
  
    }

    return {
        onSubmit
    };
    
}