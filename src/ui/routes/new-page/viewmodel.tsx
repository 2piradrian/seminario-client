import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Errors, PageType, Regex } from "../../../domain";
import toast from "react-hot-toast";

export default function ViewModel() {

    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null); 

    const onSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
        try {
            e.preventDefault();

            const form = Object.fromEntries(new FormData(e.currentTarget)) as { 
                name?: string;
                pageType?: string;
            };

            if(!Regex.NAME.test(form.name || "")) {
                return setError(Errors.INVALID_NAME);
            }
            
            toast.success("Página creada correctamente");
            navigate("/login");
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNAUTHORIZED);
        }
    } 

    const onCancel = () => {
        navigate("/profile");
    }

    return {
        onSubmit,
        onCancel,
        pageTypes: []
    }
}