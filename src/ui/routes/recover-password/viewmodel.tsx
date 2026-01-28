import { useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Errors, Regex, type RecoverPasswordReq } from "../../../domain";
import { useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";

export function ViewModel() {

    const navigate = useNavigate();

    const { logged } = useSession();
    const { authRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        if (logged) {
            navigate("/profile");
        }
    }, [logged]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            if (isSubmitting) return;

            setIsSubmitting(true);

            const form = Object.fromEntries(new FormData(e.currentTarget));

            const payload = {
                email: form.email?.toString().trim().toLowerCase() || ""
            };

            if (!Regex.EMAIL.test(payload.email)) {
                setIsSubmitting(false);
                return setError(Errors.INVALID_EMAIL);
            }

            await authRepository.recoverPassword({
                email: payload.email,
            } as RecoverPasswordReq);

            toast.success("Correo de recuperacion enviado");
            setIsSubmitting(false);
        }
        catch (error) {
            setIsSubmitting(false);
            toast.error(error ? error as string : Errors.UNAUTHORIZED);
        }
    }

    return {
        onSubmit,
        isSubmitting
    };

}
