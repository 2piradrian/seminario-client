import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Regex, Errors } from "../../../domain";
import toast from "react-hot-toast";

export function ViewModel() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const form = Object.fromEntries(formData) as {
                title?: string;
                content?: string;
            }

            if (!Regex.NAME.test(form.title || "")) {
                setError(Errors.INVALID_TITLE);
                return;
            }

            if (!Regex.SURNAME.test(form.content || "")) {
                setError(Errors.INVALID_CONTENT);
                return;
            }

            setError(null);
            toast.success("Formulario enviado correctamente");

        } catch(error) {
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
