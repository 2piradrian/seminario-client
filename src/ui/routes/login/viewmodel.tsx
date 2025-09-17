import { useEffect, useState } from "react";
import { Regex, Errors } from "../../../domain";
import toast from "react-hot-toast";

export function ViewModel() {

    const [error, setError] = useState<string | null>(null);

    useEffect(()=> {
        if (error != null){
            toast.error(error);
            setError(null);
        }
    }, [error])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
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

    }
    
    return {
        onSubmit
    };
    
}