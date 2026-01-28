import { useRepositories, CONSTANTS } from "../../../core";
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
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    const onClickPassword = () => setShowPassword(prev => !prev);
    const onClickConfirmPassword = () => setShowConfirmPassword(prev => !prev);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.dismiss();

        if (isSubmitting) return;

        const form = Object.fromEntries(new FormData(e.currentTarget));

        const payload = {
            password: form.password?.toString() || "",
            confirmPassword: form.confirmPassword?.toString() || ""
        };

        if (!Regex.PASSWORD.test(payload.password)) {
            return setError(Errors.INVALID_PASSWORD);
        }

        if (!Regex.PASSWORD.test(payload.confirmPassword)) {
            return setError(Errors.INVALID_PASSWORD);
        }

        if (payload.password !== payload.confirmPassword) {
            return setError(Errors.INVALID_PASSWORD);
        }

        const changePasswordPromise = async () => {
            setIsSubmitting(true);
            try {
                await authRepository.changePassword({
                    session: new Session(new Token(token)),
                    password: payload.password,
                });
            } catch (error) {
                throw error;
            } finally {
                setIsSubmitting(false);
            }
        };

        try {
            await toast.promise(
                changePasswordPromise(),
                {
                    loading: CONSTANTS.LOADING_EDIT_PASSWORD,
                    success: CONSTANTS.SUCCESS_EDIT_PASSWORD,
                    error: (err) => err ? err as string : Errors.UNKNOWN_ERROR,
                }
            );
            navigate("/login");
        } catch (error) {}
    }

    return {
        onSubmit,
        isSubmitting,
        showPassword,
        showConfirmPassword,
        onClickPassword,
        onClickConfirmPassword
    };

}
