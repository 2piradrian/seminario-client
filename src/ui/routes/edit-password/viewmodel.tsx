import { useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Errors, Regex, Session, Token } from "../../../domain";
import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";

export function ViewModel() {

    const { token } = useParams();

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
                password: form.password?.toString() || "",
                confirmPassword: form.confirmPassword?.toString() || ""
            };

            if (!Regex.PASSWORD.test(payload.password)) {
                setIsSubmitting(false);
                return setError(Errors.INVALID_PASSWORD);
            }

            if (!Regex.PASSWORD.test(payload.confirmPassword)) {
                setIsSubmitting(false);
                return setError(Errors.INVALID_PASSWORD);
            }

            if (payload.password !== payload.confirmPassword) {
                setIsSubmitting(false);
                return setError(Errors.INVALID_PASSWORD);
            }

            await authRepository.changePassword({
                session: new Session(new Token(token)),
                password: payload.password,
            });

            toast.success("Contraseña modificada exitosamente");
            setIsSubmitting(false);
            navigate("/login");
        }
        catch (error) {
            setIsSubmitting(false);
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    }

    return {
        onSubmit,
        isSubmitting
    };

}
