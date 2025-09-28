import { useState, useEffect } from "react";
import useSesion from "../../hooks/useSesion";
import { useNavigate } from "react-router-dom";
import { Regex, Errors } from "../../../domain";
import toast from "react-hot-toast";

export function ViewModel() {

    const navigate = useNavigate();

    const { logged } = useSesion();

    const [error, setError] = useState<string | null>(null);

    useEffect(()=> {
        if (error != null){
            toast.error(error);
            setError(null);
        }
    }, [error]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const form = Object.fromEntries(formData) as {
                title?: string;
                content?: string;
            }

            if (!Regex.POST_TITLE.test(form.title || "")) {
                return setError(Errors.INVALID_TITLE);
            }

            if (!Regex.POST_CONTENT.test(form.content || "")) {
                return setError(Errors.INVALID_CONTENT);
            }

            toast.success("Formulario enviado correctamente");

        } 
        catch(error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onCancel = () => {
        navigate("/profile");
    };

    return {
        onSubmit,
        onCancel,
        error
    };
}
